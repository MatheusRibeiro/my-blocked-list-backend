import UserNotificationDomainEvent from '../Abstractions/UserNotificationDomainEvent'

export default class UserNotificationCreated extends UserNotificationDomainEvent {
    public readonly version = 1
}
