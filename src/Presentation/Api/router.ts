import { Router } from 'express'
import authenticationRouter from './Authentication/AuthentictionRouter'
import complaintRouter from './Complaint/ComplaintRouter'
const router = Router()

router.use('/auth', authenticationRouter)
router.use('/complaint', complaintRouter)

export default router
