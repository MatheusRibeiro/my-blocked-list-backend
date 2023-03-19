import { Request, Response, NextFunction } from 'express'
import IMiddleware from '../Base/IMiddleware'

export default class LoggerMiddleware extends IMiddleware {
    public execute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        console.log(`${req.method}: ${req.url}`)
    }
}
