import { inject, injectable } from "tsyringe";
import IAuthenticationService, { AuthenticationResponse, LoginRequest, RegisterRequest } from "./IAuthenticationService";
import IJwtTokenGenerator from "./IJwtTokenGenerator";

@injectable()
export default class AuthenticationService implements IAuthenticationService {
    private readonly jwtTokenGenerator: IJwtTokenGenerator

    constructor(
        @inject("JwtTokenGenerator")
        jwtTokenGenerator: IJwtTokenGenerator
    ) {
        this.jwtTokenGenerator = jwtTokenGenerator
    }

    public async login(loginRequest: LoginRequest): Promise<AuthenticationResponse> {
        const { username, password } = loginRequest
        const userId = 'uuid'
        const token = this.jwtTokenGenerator.generateToken(userId, 'f', 'l', username)
        return {
            id: 'uuid',
            firstName: 'First',
            lastName: 'Last',
            username,
            token
        }
    }
    public async register(registerRequest: RegisterRequest): Promise<AuthenticationResponse> {
        const { firstName, lastName, username, password } = registerRequest
        const userId = 'uuid'
        const token = this.jwtTokenGenerator.generateToken(userId, firstName, lastName, username)

        return { id: userId, firstName, lastName, username, token}
    }
}