import type AuthenticationResponse from './IAuthenticationResponse'

export interface LoginRequest {
    username: string
    password: string
}

export interface RegisterRequest {
    username: string
    password: string
}

export interface UserTokenDetails {
    userId: string
    username: string
}

export default abstract class IAuthenticationService {
    abstract login(loginRequest: LoginRequest): Promise<AuthenticationResponse>
    abstract register(registerRequest: RegisterRequest): Promise<AuthenticationResponse>
    abstract validateToken(token: string): Promise<UserTokenDetails>
}
