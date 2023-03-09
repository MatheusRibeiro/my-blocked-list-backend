import { inject, injectable } from 'tsyringe'
import IAuthenticationService, { AuthenticationResponse, LoginRequest, RegisterRequest } from './IAuthenticationService'
import IJwtTokenGenerator from './IJwtTokenGenerator'
import IUserRepository from './IUserRepository'
import UserId from '../../../Domain/Aggregates/User/ValueObjects/UserId'
import { uuidFactory } from '../../../Domain/Base/ValueObject/UUID'
import User from '../../../Domain/Aggregates/User/User'
import Username from '../../../Domain/Aggregates/User/ValueObjects/Username'
import Password from '../../../Domain/Aggregates/User/ValueObjects/Password'

@injectable()
export default class AuthenticationService implements IAuthenticationService {
  private readonly jwtTokenGenerator: IJwtTokenGenerator
  private readonly userRepository: IUserRepository

  constructor (
    @inject('JwtTokenGenerator') jwtTokenGenerator: IJwtTokenGenerator,
    @inject('UserRepository') userRepository: IUserRepository
  ) {
    this.jwtTokenGenerator = jwtTokenGenerator
    this.userRepository = userRepository
  }

  public async login (loginRequest: LoginRequest): Promise<AuthenticationResponse | Error> {
    const { username } = loginRequest

    const user = await this.userRepository.findByUsername(new Username(username))
    if (user == null) {
      return new Error("Invalid username or password")
    }
    const token = this.jwtTokenGenerator.generateToken(user.userId.value, username)
    return {
      id: user.userId.value,
      username,
      token
    }
  }

  public async register (registerRequest: RegisterRequest): Promise<AuthenticationResponse> {
    const { username, password } = registerRequest
    const userId = new UserId(uuidFactory().value)
    const user = new User(
      userId,
      new Username(username),
      new Password(password)
    )
    await this.userRepository.create(user)

    const token = this.jwtTokenGenerator.generateToken(userId?.value, username)

    return { id: userId.value, username, token }
  }
}
