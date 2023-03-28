import { UserNotificationJson } from '../UserNotification'
import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'

export interface UserNotificationDeletedPayload {
    user_notification_deleted: UserNotificationJson
}

export default class UserNotificationDeleted extends DomainEvent<UserNotificationDeletedPayload> {
    public readonly version = 1
}
