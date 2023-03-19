import IMiddleware from './IMiddleware'

export default abstract class BaseController {
    public readonly middlewares: IMiddleware[] = []
}
