import { type UserTokenDetails } from './IAuthenticationService'

export default abstract class IJwtTokenGenerator {
    abstract generateToken(userId: string, username: string): string
    abstract validateToken(token: string): UserTokenDetails
}
