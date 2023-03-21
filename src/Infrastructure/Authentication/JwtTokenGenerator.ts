import { sign, verify } from 'jsonwebtoken'
import type IJwtTokenGenerator from '@src/Application/Services/Authentication/IJwtTokenGenerator'
import type { UserTokenDetails } from '@src/Application/Services/Authentication/IAuthenticationService'
import UnauthenticatedError from '@src/Domain/Errors/UnauthenticatedError'
import authenticationSettings from '../Config/authentication'

const { jwtSecret, jwtExpirationInSeconds } = authenticationSettings

export default class JwtTokenGenerator implements IJwtTokenGenerator {
    generateToken(userId: string, username: string): string {
        const payload = {
            userId,
            username,
        }
        const options = { expiresIn: jwtExpirationInSeconds }

        return sign(payload, jwtSecret, options)
    }

    validateToken(token: string): UserTokenDetails {
        try {
            const result = verify(token, jwtSecret)
            return result as UserTokenDetails
        } catch (error) {
            throw new UnauthenticatedError('Invalid Token.')
        }
    }
}
