import DomainError from '../Base/AbstractDomainError'

export default class ConflictError extends DomainError {
    public readonly code = 409
    public readonly title = 'Conflict'
}
