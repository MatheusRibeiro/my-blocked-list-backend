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

// not using interface or abstract class due known issues with DI lib tsyringe
export default class IAuthenticationService {
    login(loginRequest: LoginRequest): Promise<AuthenticationResponse> {throw Error}
    register(registerRequest: RegisterRequest): Promise<AuthenticationResponse> {throw Error}
}
