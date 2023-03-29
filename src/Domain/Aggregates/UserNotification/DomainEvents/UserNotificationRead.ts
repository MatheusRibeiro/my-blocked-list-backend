import UserNotificationDomainEvent from './AbstractUserNotificationDomainEvent'

export default class UserNotificationRead extends UserNotificationDomainEvent {
    public readonly version = 1
}
