import UserNotificationDomainEvent from '../Abstractions/UserNotificationDomainEvent'

export default class UserNotificationDeleted extends UserNotificationDomainEvent {
    public readonly version = 1
}
