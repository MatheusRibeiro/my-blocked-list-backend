import UserNotificationDomainEvent from './AbstractUserNotificationDomainEvent'

export default class UserNotificationDeleted extends UserNotificationDomainEvent {
    public readonly version = 1
}
