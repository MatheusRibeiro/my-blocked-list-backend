import { Request, Response, Router } from "express"
import authenticationRouter from "./Authentication/AuthentictionRouter"
const router = new Router()

router.use('/auth', authenticationRouter)

export default router