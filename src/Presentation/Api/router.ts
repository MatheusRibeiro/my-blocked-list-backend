import { Router } from 'express'
import authenticationRouter from './Authentication/AuthentictionRouter'
const router = Router()

router.use('/auth', authenticationRouter)

export default router
