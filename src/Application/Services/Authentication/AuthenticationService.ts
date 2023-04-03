import { inject, injectable } from 'tsyringe'
import IJwtTokenGenerator from './IJwtTokenGenerator'
import IUserRepository from '@src/Domain/Aggregates/User/IUserRepository'
import type IAuthenticationService from './IAuthenticationService'
import type { RegisterRequest, LoginRequest, UserTokenDetails } from './IAuthenticationService'
import type AuthenticationResponse from './IAuthenticationResponse'
import User from '@src/Domain/Aggregates/User/User'
import Username from '@src/Domain/Aggregates/User/ValueObjects/Username'
import Password from '@src/Domain/Aggregates/User/ValueObjects/Password'
import { uuidFactory } from '@src/Domain/Base/Types/UUID'
import ConflictError from '@src/Domain/Errors/ConflictError'
import NotFoundError from '@src/Domain/Errors/NotFoundError'

const usernameAlreadyTakenMessage = 'Username already taken.'
const invalidCredentialsMessage = 'Invalid username or password.'

@injectable()
export default class AuthenticationService implements IAuthenticationService {
    private readonly jwtTokenGenerator: IJwtTokenGenerator
    private readonly userRepository: IUserRepository

    constructor(
        @inject('JwtTokenGenerator') jwtTokenGenerator: IJwtTokenGenerator,
        @inject('UserRepository') userRepository: IUserRepository
    ) {
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
        const user = new User(userId, newUsername, new Password(password))
        await this.userRepository.create(user)

        return this.generateLoginResponse(userId, username)
    }

    public async login(loginRequest: LoginRequest): Promise<AuthenticationResponse> {
        const { username, password } = loginRequest

        const user = await this.userRepository.findByUsername(new Username(username))
        if (user === null) {
            throw new NotFoundError(invalidCredentialsMessage)
        }

        if (!user.password.isEqual(new Password(password))) {
            throw new NotFoundError(invalidCredentialsMessage)
        }

        return this.generateLoginResponse(user.getId(), username)
    }

    public async validateToken(token: string): Promise<UserTokenDetails> {
        return this.jwtTokenGenerator.validateToken(token)
    }

    public async refreshLogin(refreshToken: string): Promise<AuthenticationResponse> {
        const { userId, username } = this.jwtTokenGenerator.validateToken(refreshToken)
        return this.generateLoginResponse(userId, username)
    }

    private generateLoginResponse(userId: string, username: string): AuthenticationResponse {
        const token = this.jwtTokenGenerator.generateToken(userId, username)
        const refreshToken = this.jwtTokenGenerator.generateRefreshToken(userId, username)

        return { id: userId, username, token, refresh_token: refreshToken }
    }
}
