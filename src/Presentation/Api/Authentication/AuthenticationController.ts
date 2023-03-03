import { Request, Response } from "express"

const AuthenticationController = {
    login: () => ({
        msg: 'login'
    }),
    register: () => ({
        msg: 'register'
    })
}

export default AuthenticationController