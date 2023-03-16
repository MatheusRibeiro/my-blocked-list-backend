import DomainError from '../Base/AbstractDomainError'

export default class BadRequestError extends DomainError {
    public readonly code = 400
    public readonly title = 'Bad Request'
}
