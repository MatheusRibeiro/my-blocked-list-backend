export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  password: string
}

export interface AuthenticationResponse {
  id: string
  username: string
  token: string
}

export default abstract class IAuthenticationService {
  abstract login (loginRequest: LoginRequest): Promise<AuthenticationResponse | Error>
  abstract register (registerRequest: RegisterRequest): Promise<AuthenticationResponse | Error>
}
