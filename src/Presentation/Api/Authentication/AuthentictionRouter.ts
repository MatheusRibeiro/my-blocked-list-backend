import { Router } from "express"
import AuthenticationController from "./AuthenticationController"
import resultHandler from "../controllerResultHandler"

import { container } from 'tsyringe'
import IJwtTokenGenerator from "../../../Application/Services/Authentication/IJwtTokenGenerator"
import JwtTokenGenerator from "../../../Infrastructure/Authentication/JwtTokenGenerator"
import IAuthenticationService from "../../../Application/Services/Authentication/IAuthenticationService"
import AuthenticationService from "../../../Application/Services/Authentication/AuthenticationService"

container.register(IJwtTokenGenerator, { useClass: JwtTokenGenerator })
container.register(IAuthenticationService, { useClass: AuthenticationService })

const authenticationRouter = Router()
const controller = container.resolve(AuthenticationController)

authenticationRouter.post('/login', resultHandler(controller.login))
authenticationRouter.post('/register', resultHandler(controller.register))

export default authenticationRouter