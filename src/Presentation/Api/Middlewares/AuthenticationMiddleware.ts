import type { Request, Response, NextFunction } from 'express'
import { inject, injectable } from 'tsyringe'
import IAuthenticationService from '@src/Application/Services/Authentication/IAuthenticationService'
import { errorHandler } from '../ResultHandler'
import UnauthenticatedError from '@src/Domain/Errors/UnauthenticatedError'

const missingTokenError = 'A token is required for this action.'

@injectable()
export default class AuthenticationMiddleware {
    private readonly authService: IAuthenticationService

    constructor(
        @inject('AuthenticationService')
        authService: IAuthenticationService
    ) {
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
            res.locals.User = await this.authService.validateToken(token)
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
        if (splitedHeader.length !== 2) {
            return null
        }
        const [, token] = splitedHeader
        return token
    }
}
