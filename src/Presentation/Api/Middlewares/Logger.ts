import { Request, Response, NextFunction } from 'express'
import IMiddleware from '../Base/IMiddleware'

export default class LoggerMiddleware extends IMiddleware {
    public execute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const url = this.hideUrlParams(req.url)
        console.log(`${req.method}: ${url}`)
        next()
    }

    private hideUrlParams(url: string): string {
        const [baseUrl, paramsString] = url.split('?')
        if (paramsString === undefined) {
            return url
        }
        const params = paramsString.split('&').map(this.hideValue).join('&')

        return `${baseUrl}?${params}`
    }

    private hideValue(paramString: string): string {
        const [name] = paramString.split('=')
        return `${name}={${name}}`
    }
}
