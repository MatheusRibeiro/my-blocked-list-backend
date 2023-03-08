import { Router } from 'express'

import AuthenticationController from './AuthenticationController'
import resultHandler from '../controllerResultHandler'

import { container } from 'tsyringe'

const authenticationRouter = Router()
const controller = container.resolve(AuthenticationController)

authenticationRouter.post('/login', resultHandler(controller.login))
authenticationRouter.post('/register', resultHandler(controller.register))

export default authenticationRouter
