import { Request } from 'express'
import { inject, injectable } from 'tsyringe'
import IAuthenticationService from '@src/Application/Services/Authentication/IAuthenticationService'
import AuthenticationResponse from '@src/Application/Services/Authentication/IAuthenticationResponse'
import { Controller } from '../Base/Decorators/Controller'
import { Post } from '../Base/Decorators/Route'
import IController from '../Base/BaseController'

@Controller('/auth')
@injectable()
export default class AuthenticationController extends IController {
    private readonly authService: IAuthenticationService

    constructor(
        @inject('AuthenticationService')
        authService: IAuthenticationService
    ) {
        super()
        this.authService = authService
    }

    @Post('/login')
    public login = async (req: Request): Promise<AuthenticationResponse | Error> => {
        const { username, password } = req.body

        return await this.authService.login({ username, password })
    }

    @Post('/register')
    public register = async (req: Request): Promise<AuthenticationResponse | Error> => {
        const { username, password } = req.body

        return await this.authService.register({ username, password })
    }
}
