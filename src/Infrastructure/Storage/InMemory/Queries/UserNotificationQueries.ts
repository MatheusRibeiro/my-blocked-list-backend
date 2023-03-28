import IUserNotificationQueries, {
    UserNotificationViewModel,
    GetUserNotificationsQuery,
} from '@src/Application/UserNotification/Queries/IUserNotificationQueries'
import UserNotification from '@src/Domain/Aggregates/UserNotification/UserNotification'
import InMemoryQuery from './InMemoryQuery'
import dbContext from '../DbContext'
import UUID from '@src/Domain/Base/ValueObject/UUID'

export default class UserNotificationInMemoryQueries extends InMemoryQuery implements IUserNotificationQueries {
    async getUserNotifications({ userId }: GetUserNotificationsQuery): Promise<UserNotificationViewModel[]> {
        const notifications = this.getUserNotificationsByUser(userId)
        return notifications.map(this.toViewModel)
    }

    private getUserNotificationsByUser(userId: string): UserNotification[] {
        const repositoryName = this.repositoryNames.UserNotification
        const userUuid = new UUID(userId)
        const notificatonsForUser: UserNotification[] = []
        for (let i = 0; i < dbContext[repositoryName].length; i++) {
            const notification = dbContext[repositoryName][i] as UserNotification
            if (notification.userId.isEqual(userUuid)) notificatonsForUser.push(notification)
        }
        return notificatonsForUser
    }

    private toViewModel(userNotification: UserNotification): UserNotificationViewModel {
        return {
            id: userNotification.userNotificationId.toJSON(),
            type: userNotification.userNotificationType.toJSON(),
            author: { id: userNotification.authorId.toJSON() },
            payload: userNotification.payload,
            isRead: userNotification.isRead(),
        }
    }
}
