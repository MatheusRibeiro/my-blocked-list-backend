import DomainError from '../Base/Abstractions/DomainError'

export default class ConflictError extends DomainError {
    public readonly code = 409
    public readonly title = 'Conflict'
}
