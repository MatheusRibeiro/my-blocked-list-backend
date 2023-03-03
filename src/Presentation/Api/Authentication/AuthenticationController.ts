import { Request } from "express"


const AuthenticationController = {
    login: (req: Request) => req.body,
    register: (req: Request) => req.body
}

export default AuthenticationController