import { Request } from "express"
import { autoInjectable } from "tsyringe"
import IAuthenticationService, { AuthenticationResponse } from "../../../Application/Services/Authentication/IAuthenticationService"


@autoInjectable()
export default class AuthenticationController {
    private authService: IAuthenticationService

    constructor(authService: IAuthenticationService) {
        this.authService = authService
    }

    public login  = (req: Request): Promise<AuthenticationResponse>  => {
        const { username, password } = req?.body || {}

        return this.authService.login({ username, password })
    }

    public register = (req: Request): Promise<AuthenticationResponse> => {
        const {
            first_name: firstName,
            last_name: lastName,
            username,
            password
        } = req?.body || {}

        return this.authService.register({ firstName, lastName, username, password })
    }
}
