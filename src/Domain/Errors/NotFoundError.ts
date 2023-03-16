import DomainError from '../Base/AbstractDomainError'

export default class NotFoundError extends DomainError {
    public readonly code = 404
    public readonly title = 'Not Found'
}