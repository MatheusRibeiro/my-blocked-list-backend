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
    role?: string
}

export default abstract class AbstractAuthenticationService {
    abstract login(loginRequest: LoginRequest): Promise<AuthenticationResponse>
    abstract register(registerRequest: RegisterRequest): Promise<AuthenticationResponse>
    abstract validateToken(token: string): Promise<UserTokenDetails>
    abstract refreshLogin(refreshToken: string): Promise<AuthenticationResponse>
    public isARefreshToken({ role }: UserTokenDetails): boolean {
        return role === undefined
    }
}
