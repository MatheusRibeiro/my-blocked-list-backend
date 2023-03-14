import { sign } from 'jsonwebtoken'
import IJwtTokenGenerator from '@src/Application/Services/Authentication/IJwtTokenGenerator'

const secret = '?'

export default class JwtTokenGenerator implements IJwtTokenGenerator {
    generateToken(userId: string, username: string): string {
        const payload = { userId, username }
        return sign(payload, secret)
    }
}
