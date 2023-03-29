import DomainError from '../Base/Abstractions/DomainError'

export default class UnauthenticatedError extends DomainError {
    public readonly code = 401
    public readonly title = 'Unauthenticated'
}
