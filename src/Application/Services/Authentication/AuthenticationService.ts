import { inject, injectable } from 'tsyringe'
import IJwtTokenGenerator from './IJwtTokenGenerator'
import IUserRepository from '@src/Domain/Aggregates/User/IUserRepository'
import AbstractAuthenticationService from './AbstractAuthenticationService'
import type { RegisterRequest, LoginRequest, UserTokenDetails } from './AbstractAuthenticationService'
import type AuthenticationResponse from './IAuthenticationResponse'
import User from '@src/Domain/Aggregates/User/User'
import Username from '@src/Domain/Aggregates/User/ValueObjects/Username'
import Password from '@src/Domain/Aggregates/User/ValueObjects/Password'
import { assertIsUUID, uuidFactory } from '@src/Domain/Base/Types/UUID'
import ConflictError from '@src/Domain/Errors/ConflictError'
import NotFoundError from '@src/Domain/Errors/NotFoundError'
import { DEFAULT_USER_ROLE } from '@src/Domain/Aggregates/User/ValueObjects/UserRole'

const usernameAlreadyTakenMessage = 'Username already taken.'
const invalidCredentialsMessage = 'Invalid username or password.'
const invalidRefreshToken = 'Invalid refresh token.'

@injectable()
export default class AuthenticationService extends AbstractAuthenticationService {
    private readonly jwtTokenGenerator: IJwtTokenGenerator
    private readonly userRepository: IUserRepository

    constructor(
        @inject('JwtTokenGenerator') jwtTokenGenerator: IJwtTokenGenerator,
        @inject('UserRepository') userRepository: IUserRepository
    ) {
        super()
        this.jwtTokenGenerator = jwtTokenGenerator
        this.userRepository = userRepository
    }

    public async register({ username, password }: RegisterRequest): Promise<AuthenticationResponse> {
        const newUsername = new Username(username)
        const userExists = await this.userRepository.findByUsername(newUsername)
        if (userExists !== null) {
            throw new ConflictError(usernameAlreadyTakenMessage)
        }

        const userId = uuidFactory()
        const user = new User(userId, newUsername, DEFAULT_USER_ROLE, new Password(password))
        await this.userRepository.create(user)

        return this.generateLoginResponse(user)
    }

    public async login(loginRequest: LoginRequest): Promise<AuthenticationResponse> {
        const { username, password } = loginRequest

        const user = await this.userRepository.findByUsername(new Username(username))
        if (user === null) {
            throw new NotFoundError(invalidCredentialsMessage)
        }

        if (!user.isPasswordCorrect(password)) {
            throw new NotFoundError(invalidCredentialsMessage)
        }

        return this.generateLoginResponse(user)
    }

    public async validateToken(token: string): Promise<UserTokenDetails> {
        return this.jwtTokenGenerator.validateToken(token)
    }

    public async refreshLogin(refreshToken: string): Promise<AuthenticationResponse> {
        const tokenDetails = this.jwtTokenGenerator.validateToken(refreshToken)
        if (!this.isARefreshToken(tokenDetails)) {
            throw new NotFoundError(invalidRefreshToken)
        }

        const { userId } = tokenDetails
        assertIsUUID(userId)
        const user = await this.userRepository.findById(userId)
        if (user === null) {
            throw new NotFoundError(invalidCredentialsMessage)
        }
        // TODO: throw invalid error if user was updated recently

        return this.generateLoginResponse(user)
    }

    private generateLoginResponse(user: User): AuthenticationResponse {
        const userId = user.getId()
        const username = user.getUsername().value
        const role = user.getRole()

        const token = this.jwtTokenGenerator.generateToken(userId, username, role)
        const refreshToken = this.jwtTokenGenerator.generateRefreshToken(userId, username)

        return { id: userId, username, token, refresh_token: refreshToken }
    }
}
