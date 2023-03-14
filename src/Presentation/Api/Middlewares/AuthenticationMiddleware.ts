import type { Request, Response, NextFunction } from 'express'
import { inject, injectable } from 'tsyringe'
import IAuthenticationService from '@src/Application/Services/Authentication/IAuthenticationService'
import { errorHandler } from '../ResultHandler'
import UnauthenticatedError from '@src/Domain/Errors/UnauthenticatedError'

const missingTokenError = 'A Bearer token is required for this action.'

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
        const authorizationHeader = req.header('Authorization')
        if (authorizationHeader === undefined) {
            errorHandler(res, new UnauthenticatedError(missingTokenError))
            return
        }
        const splitedHeader = authorizationHeader.split(' ')
        if (splitedHeader.length !== 2) {
            errorHandler(res, new UnauthenticatedError(missingTokenError))
            return
        }
        const [, token] = splitedHeader
        try {
            const tokenContent = await this.authService.validateToken(token)
            console.log({ token, tokenContent })
            next()
        } catch (error) {
            errorHandler(res, error)
        }
    }
}
