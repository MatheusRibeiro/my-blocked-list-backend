import { container } from 'tsyringe'

import IJwtTokenGenerator from "../../Application/Services/Authentication/IJwtTokenGenerator"
import JwtTokenGenerator from "../../Infrastructure/Authentication/JwtTokenGenerator"

import IAuthenticationService from "../../Application/Services/Authentication/IAuthenticationService"
import AuthenticationService from "../../Application/Services/Authentication/AuthenticationService"

container.registerSingleton<IJwtTokenGenerator>("JwtTokenGenerator", JwtTokenGenerator)
container.registerSingleton<IAuthenticationService>("AuthenticationService", AuthenticationService)
