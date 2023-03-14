import { type Request, type Response } from 'express'
import DomainError from '@src/Domain/Errors/AbstractDomainError'

type BaseResponseTypes = string | number | boolean | null | object
type ResponseType = BaseResponseTypes | BaseResponseTypes[]

export type RequestHandler = (req: Request) => Promise<ResponseType>

interface ErrorDetails {
    title: string
    code: number
    message: string
}

export default (requestHandler: RequestHandler) => async (request: Request, response: Response) => {
    try {
        const result = await requestHandler(request)

        return response.json(result)
    } catch (error) {
        errorHandler(response, error)
    }
}

export function errorHandler(response: Response, error: unknown): void {
    let result: ErrorDetails

    if (error instanceof DomainError) {
        result = {
            title: error.title,
            code: error.code,
            message: error.message,
        }
    } else {
        result = {
            title: 'Internal Error',
            code: 500,
            message: 'An unexpected error occured.',
        }
    }
    response.status(result.code).json(result)
}
