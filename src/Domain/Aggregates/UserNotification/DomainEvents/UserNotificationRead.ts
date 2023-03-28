import { UserNotificationJson } from '../UserNotification'
import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'

export interface UserNotificationReadPayload {
    user_notification_read: UserNotificationJson
}

export default class UserNotificationRead extends DomainEvent<UserNotificationReadPayload> {
    public readonly version = 1
}
