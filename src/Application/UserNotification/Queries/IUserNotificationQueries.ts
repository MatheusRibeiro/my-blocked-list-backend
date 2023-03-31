import { UserNotificatonPayload } from '@src/Domain/Aggregates/UserNotification/UserNotification'

export interface UserNotificationViewModel {
    id: string
    type: string
    author: { id: string }
    payload: UserNotificatonPayload
    isRead: boolean
}
export interface GetUserNotificationsQuery {
    userId: string
}

export default interface IComplaintQueries {
    getUserNotifications: (params: GetUserNotificationsQuery) => Promise<UserNotificationViewModel[]>
}
