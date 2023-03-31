import Entity from '../../Base/Abstractions/Entity'
import { ComplaintJson } from '../Contact/Complaint/Complaint'
import { ContactJson } from '../Contact/Contact'
import UserId from '../User/ValueObjects/UserId'
import UserNotificationId from './ValueObjects/UserNotificationId'
import UserNotificationType from './ValueObjects/UserNotificationType'
interface ComplaintPayload extends ComplaintJson {}
interface ContactPayload extends ContactJson {}

export interface UserNotificatonPayload {
    complaint: ComplaintPayload
    contact: ContactPayload
}

export interface UserNotificationJson {
    id: string
    user: { id: string }
    author: { id: string }
    type: string
    payload: UserNotificatonPayload
    isRead: boolean
}

export default class UserNotification extends Entity {
    public userNotificationId: UserNotificationId
    public userId: UserId
    public authorId: UserId
    public userNotificationType: UserNotificationType
    public payload: UserNotificatonPayload
    public readAt: Date | undefined

    constructor(
        userNotificationId: UserNotificationId,
        userId: UserId,
        authorId: UserId,
        userNotificationType: UserNotificationType,
        payload: UserNotificatonPayload
    ) {
        super()
        this.userNotificationId = userNotificationId
        this.userId = userId
        this.authorId = authorId
        this.userNotificationType = userNotificationType
        this.payload = payload
    }

    public getId(): UserNotificationId {
        return this.userNotificationId
    }

    public isValid(): boolean {
        return true
    }

    public isEqual(entity: UserNotification): boolean {
        return this.userNotificationId.isEqual(entity.userNotificationId)
    }

    public markAsRead(): void {
        this.readAt = new Date()
    }

    public isRead(): boolean {
        return this.readAt !== undefined
    }

    public toJSON(): UserNotificationJson {
        return {
            id: this.userNotificationId.toJSON(),
            user: { id: this.userId.toJSON() },
            author: { id: this.authorId.toJSON() },
            type: this.userNotificationType.toJSON(),
            payload: this.payload,
            isRead: this.isRead(),
        }
    }
}
