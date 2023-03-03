import IAuthenticationService, { AuthenticationResponse, LoginRequest, RegisterRequest } from "./IAuthenticationService";

export default class AuthenticationService implements IAuthenticationService {
    public async login(loginRequest: LoginRequest): Promise<AuthenticationResponse> {
        return {
            id: 'uuid',
            firstName: 'First',
            lastName: 'Last',
            username: loginRequest.username,
            token: 'jwt token generated'
        }
    }
    public async register(registerRequest: RegisterRequest): Promise<AuthenticationResponse> {
        return {
            id: 'uuid',
            firstName: registerRequest.firstName,
            lastName: registerRequest.lastName,
            username: registerRequest.username,
            token: 'jwt token generated'
        }
    }
}