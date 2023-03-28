import { UserNotificationJson } from '../UserNotification'
import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'

export interface UserNotificationCreatedPayload {
    user_notification_created: UserNotificationJson
}

export default class UserNotificationCreated extends DomainEvent<UserNotificationCreatedPayload> {
    public readonly version = 1
}
