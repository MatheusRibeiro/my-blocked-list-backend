export interface LoginRequest {
    username: string
    password: string
}

export interface RegisterRequest {
    firstName: string
    lastName: string
    username: string
    password: string
}

export interface AuthenticationResponse {
    id: string
    firstName: string
    lastName: string
    username: string
    token: string
}

export default abstract class IAuthenticationService {
    abstract login(loginRequest: LoginRequest): Promise<AuthenticationResponse>
    abstract register(registerRequest: RegisterRequest): Promise<AuthenticationResponse>
}
