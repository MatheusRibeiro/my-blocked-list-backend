import { Router } from "express";
import AuthenticationController from "./AuthenticationController"
import resultHandler from "../controllerResultHandler";

const authenticationRouter = Router()
const controller = new AuthenticationController()

authenticationRouter.post('/login', resultHandler(controller.login))
authenticationRouter.post('/register', resultHandler(controller.register))

export default authenticationRouter