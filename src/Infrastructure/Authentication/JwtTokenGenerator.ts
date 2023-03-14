import { sign, verify } from 'jsonwebtoken'
import type IJwtTokenGenerator from '@src/Application/Services/Authentication/IJwtTokenGenerator'
import type { UserTokenDetails } from '@src/Application/Services/Authentication/IAuthenticationService'
import UnauthenticatedError from '@src/Domain/Errors/UnauthenticatedError'

const JWT_SECRET = '?'
const EXPIRES_IN_SECONDS = 6000

export default class JwtTokenGenerator implements IJwtTokenGenerator {
    generateToken(userId: string, username: string): string {
        const payload = {
            userId,
            username,
        }
        const options = { expiresIn: EXPIRES_IN_SECONDS }

        return sign(payload, JWT_SECRET, options)
    }

    validateToken(token: string): UserTokenDetails {
        try {
            const result = verify(token, JWT_SECRET)
            return result as UserTokenDetails
        } catch (error) {
            throw new UnauthenticatedError('Invalid Token.')
        }
    }
}
