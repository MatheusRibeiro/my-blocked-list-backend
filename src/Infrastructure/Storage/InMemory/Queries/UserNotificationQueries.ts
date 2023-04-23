import IUserNotificationQueries, {
    UserNotificationViewModel,
    GetUserNotificationsQuery,
} from '@src/Application/UserNotification/Queries/IUserNotificationQueries'
import UserNotification from '@src/Domain/Aggregates/UserNotification/UserNotification'
import InMemoryQuery from '../Base/InMemoryQuery'
import dbContext from '../Base/DbContext'
import UUID from '@src/Domain/Base/ValueObject/UUID'

export default class UserNotificationInMemoryQueries extends InMemoryQuery implements IUserNotificationQueries {
    async getUserNotifications({ userId }: GetUserNotificationsQuery): Promise<UserNotificationViewModel[]> {
        const notifications = this.getUserNotificationsByUser(userId)
        return notifications.map(this.toViewModel)
    }

    private getUserNotificationsByUser(userId: string): UserNotification[] {
        const uuid = new UUID(userId)
        if (!uuid.isValid()) {
            return []
        }
        const repositoryName = this.repositoryNames.UserNotification
        const notificatonsForUser: UserNotification[] = []
        for (let i = 0; i < dbContext[repositoryName].length; i++) {
            const notification = dbContext[repositoryName][i] as UserNotification
            if (notification.userId.isEqual(uuid)) notificatonsForUser.push(notification)
        }
        return notificatonsForUser
    }

    private toViewModel(userNotification: UserNotification): UserNotificationViewModel {
        return {
            id: userNotification.userNotificationId.getValue(),
            type: userNotification.userNotificationType,
            author: { id: userNotification.authorId.getValue() },
            payload: userNotification.payload,
            isRead: userNotification.isRead(),
        }
    }
}
