import UserNotificationDomainEvent from '../Abstractions/UserNotificationDomainEvent'

export default class UserNotificationRead extends UserNotificationDomainEvent {
    public readonly version = 1
}
