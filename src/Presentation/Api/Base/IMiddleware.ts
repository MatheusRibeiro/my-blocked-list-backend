import { Request, Response, NextFunction } from 'express'

type middlewareFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>
export default abstract class IMiddleware {
    abstract execute: middlewareFunction
}
