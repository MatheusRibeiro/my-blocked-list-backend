import DomainError from '../Base/Abstractions/DomainError'

export default class NotFoundError extends DomainError {
    public readonly code = 404
    public readonly title = 'Not Found'
}
