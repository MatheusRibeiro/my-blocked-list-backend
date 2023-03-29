import UserWatchedContactDomainEvent from './AbstractUserWatchedContactDomainEvent'

export default class UserWatchedContact extends UserWatchedContactDomainEvent {
    public readonly version = 1
}
