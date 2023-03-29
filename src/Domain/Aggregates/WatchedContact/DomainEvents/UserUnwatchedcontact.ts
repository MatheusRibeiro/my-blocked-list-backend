import UserWatchedContactDomainEvent from './AbstractUserWatchedContactDomainEvent'

export default class UserUnwatchedContact extends UserWatchedContactDomainEvent {
    public readonly version = 1
}
