import { type Request } from 'express'
import { inject, injectable } from 'tsyringe'
import IAuthenticationService from '@src/Application/Services/Authentication/IAuthenticationService'

@injectable()
export default class ComplaintController {
    private readonly authService: IAuthenticationService

    constructor(
        @inject('AuthenticationService')
        authService: IAuthenticationService
    ) {
        this.authService = authService
    }

    public create = async (req: Request): Promise<null> => {
        return null
    }
}
