import { Router } from "express";
import controller from "./AuthenticationController"
import resultHandler from "../controllerResultHandler";

const authenticationRouter = new Router()

authenticationRouter.post('/login', resultHandler(controller.login))
authenticationRouter.post('/register', resultHandler(controller.register))

export default authenticationRouter