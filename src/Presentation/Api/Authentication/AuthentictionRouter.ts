import { Router } from 'express'
import { container } from 'tsyringe'
import AuthenticationController from './AuthenticationController'
import resultHandler from '../ResultHandler'

const authenticationRouter = Router()
const controller = container.resolve(AuthenticationController)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
authenticationRouter.post('/login', resultHandler(controller.login))

// eslint-disable-next-line @typescript-eslint/no-misused-promises
authenticationRouter.post('/register', resultHandler(controller.register))

export default authenticationRouter
