import { Request } from "express"
import AuthenticationService from "../../../Application/Services/Authentication/AuthenticationService"
import IAuthenticationService, { AuthenticationResponse } from "../../../Application/Services/Authentication/IAuthenticationService"

export default class AuthenticationController {
    private authService: IAuthenticationService
    constructor(authService?: IAuthenticationService) {
        this.authService = authService ? authService : new AuthenticationService()
    }

    public login  = (req: Request): Promise<AuthenticationResponse>  => {
        return this.authService.login({
            username: req.body.username,
            password: req.body.password
        })
    }

    public register = (req: Request): Promise<AuthenticationResponse> => {
        return this.authService.register({
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            username: req.body.username,
            password: req.body.password
        })
    }
}
