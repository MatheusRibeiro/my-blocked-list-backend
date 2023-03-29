import UserWatchedContactDomainEvent from '../Abstractions/UserWatchedContactDomainEvent'

export default class UserUnwatchedContact extends UserWatchedContactDomainEvent {
    public readonly version = 1
}
