import UserWatchedContactDomainEvent from '../Abstractions/UserWatchedContactDomainEvent'

export default class UserWatchedContact extends UserWatchedContactDomainEvent {
    public readonly version = 1
}
