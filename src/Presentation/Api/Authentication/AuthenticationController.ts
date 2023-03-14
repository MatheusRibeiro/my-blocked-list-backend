import { Request } from 'express'
import { inject, injectable } from 'tsyringe'
import IAuthenticationService from '@src/Application/Services/Authentication/IAuthenticationService'
import AuthenticationResponse from '@src/Application/Services/Authentication/IAuthenticationResponse'

@injectable()
export default class AuthenticationController {
    private readonly authService: IAuthenticationService

    constructor(
        @inject('AuthenticationService')
        authService: IAuthenticationService
    ) {
        this.authService = authService
    }

    public login = async (req: Request): Promise<AuthenticationResponse | Error> => {
        const { username, password } = req.body

        return await this.authService.login({ username, password })
    }

    public register = async (req: Request): Promise<AuthenticationResponse | Error> => {
        const { username, password } = req.body

        return await this.authService.register({ username, password })
    }
}
