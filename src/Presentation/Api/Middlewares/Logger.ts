import { Request, Response, NextFunction } from 'express'
import IMiddleware from '../Base/IMiddleware'

export default class LoggerMiddleware extends IMiddleware {
    public execute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        // ?param1={param1}&param2={param2}
        const regexMiddle = /=.*&/
        const regexEnd = /=[^=]*$/
        const replace = '=*****'
        const url = req.url.replace(regexEnd, replace).replace(regexMiddle, `${replace}&`)

        console.log(`${req.method}: ${url}`)
        next()
    }
}
