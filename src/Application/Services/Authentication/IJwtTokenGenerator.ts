import { type UserTokenDetails } from './AbstractAuthenticationService'

export default abstract class IJwtTokenGenerator {
    abstract generateToken(userId: string, username: string, role: string): string
    abstract generateRefreshToken(userId: string, username: string): string
    abstract validateToken(token: string): UserTokenDetails
}
