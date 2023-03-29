import UserNotificationDomainEvent from './AbstractUserNotificationDomainEvent'

export default class UserNotificationCreated extends UserNotificationDomainEvent {
    public readonly version = 1
}
