import { type Request, type Response } from 'express'
import DomainError from '@src/Domain/Base/Abstractions/DomainError'

type BaseResponseTypes = string | number | boolean | null | object
type ResponseType = BaseResponseTypes | BaseResponseTypes[]

export type RequestHandler = (req: Request, res: Response) => Promise<ResponseType>

interface ErrorDetails {
    title: string
    code: number
    message: string
}

export default (requestHandler: RequestHandler) => async (request: Request, response: Response) => {
    try {
        const result = await requestHandler(request, response)

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
        console.error(error)
    }
    response.status(result.code).json(result)
}
