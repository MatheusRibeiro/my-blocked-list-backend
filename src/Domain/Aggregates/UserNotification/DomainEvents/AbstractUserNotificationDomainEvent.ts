import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'
import Audit from '@src/Domain/Base/Audit'
import { UserNotificationJson } from '../UserNotification'

export interface UserNotificationDomainEventPayload {
    user_notification: UserNotificationJson
}

export default abstract class UserNotificationDomainEvent extends DomainEvent {
    public readonly userNotication: UserNotificationJson

    constructor(userNotification: UserNotificationJson, audit: Audit) {
        super(audit)
        this.userNotication = userNotification
    }

    public getPayload(): UserNotificationDomainEventPayload {
        return { user_notification: this.userNotication }
    }
}
