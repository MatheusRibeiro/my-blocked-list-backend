import IJwtTokenGenerator from '../../Application/Services/Authentication/IJwtTokenGenerator'
import jwt from 'jsonwebtoken'

const secret = '?'

export default class JwtTokenGenerator implements IJwtTokenGenerator {
  generateToken (userId: string, username: string): string {
    const payload = {
      userId,
      username
    }

    return jwt.sign(payload, secret)
  }
}
