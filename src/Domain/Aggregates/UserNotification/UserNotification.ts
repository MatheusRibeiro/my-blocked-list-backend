import Entity from '../../Base/AbstractEntity'
import UserId from '../User/ValueObjects/UserId'
import UserNotificationId from './ValueObjects/UserNotificationId'
import UserNotificationType from './ValueObjects/UserNotificationType'

export interface UserNotificationJson {
    id: string
    user: { id: string }
    author: { id: string }
    type: string
    payload: object
    isRead: boolean
}

export default class UserNotification extends Entity {
    public userNotificationId: UserNotificationId
    public userId: UserId
    public authorId: UserId
    public userNotificationType: UserNotificationType
    public payload: object
    public readAt: Date | undefined

    constructor(
        userNotificationId: UserNotificationId,
        userId: UserId,
        authorId: UserId,
        userNotificationType: UserNotificationType,
        payload: object
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
