import { Router } from 'express'
import { container } from 'tsyringe'
import ComplaintController from './ComplaintController'
import resultHandler from '../ResultHandler'
import AuthenticationMiddleware from '../Middlewares/AuthenticationMiddleware'

const complaintRouter = Router()
const controller = container.resolve(ComplaintController)
const authMiddleware = container.resolve(AuthenticationMiddleware)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
complaintRouter.post('/create', authMiddleware.execute, resultHandler(controller.create))

export default complaintRouter