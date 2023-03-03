import { Router } from "express";
import controller from "./AuthenticationController"
import resultHandler from "../controllerResultHandler";

const authenticationRouter = new Router()

authenticationRouter.get('/login', resultHandler(controller.login))
authenticationRouter.get('/register', resultHandler(controller.register))

export default authenticationRouter