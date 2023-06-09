import type { Request, Response, NextFunction } from 'express'
import { inject, injectable } from 'tsyringe'
import IAuthenticationService from '@src/Application/Services/Authentication/AbstractAuthenticationService'
import { errorHandler } from '../Base/ResultHandler'
import UnauthenticatedError from '@src/Domain/Errors/UnauthenticatedError'
import IMiddleware from '../Base/IMiddleware'

const missingTokenError = 'Access token is missing or invalid.'

@injectable()
export default class AuthenticationMiddleware extends IMiddleware {
    private readonly authService: IAuthenticationService

    constructor(
        @inject('AuthenticationService')
        authService: IAuthenticationService
    ) {
        super()
        this.authService = authService
    }

    public execute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const method = req.method
        const token = method === 'GET' ? this.getTokenFromUrl(req) : this.getTokenFromHeader(req)
        if (token === null) {
            errorHandler(res, new UnauthenticatedError(missingTokenError))
            return
        }
        try {
            const tokenDetails = await this.authService.validateToken(token)
            if (this.authService.isARefreshToken(tokenDetails)) {
                errorHandler(res, new UnauthenticatedError(missingTokenError))
                return
            }
            res.locals.User = tokenDetails
            next()
        } catch (error) {
            errorHandler(res, error)
        }
    }

    private getTokenFromUrl(req: Request): string | null {
        const token = req.query.token?.toString()
        if (typeof token === 'string' && token.length > 0) {
            return token
        }
        return null
    }

    private getTokenFromHeader(req: Request): string | null {
        const authorizationHeader = req.header('Authorization')
        if (authorizationHeader === undefined) {
            return null
        }
        const splitedHeader = authorizationHeader.split(' ')
        if (splitedHeader.length !== 2 || splitedHeader[0] !== 'Bearer') {
            return null
        }
        const [, token] = splitedHeader
        return token
    }
}
