import { UserNotificatonPayload } from '@src/Domain/Aggregates/UserNotification/UserNotification'
import UUID from '@src/Domain/Base/Types/UUID'

export interface UserNotificationViewModel {
    id: UUID
    type: string
    author: { id: UUID }
    payload: UserNotificatonPayload
    isRead: boolean
}
export interface GetUserNotificationsQuery {
    userId: string
}

export default interface IComplaintQueries {
    getUserNotifications: (params: GetUserNotificationsQuery) => Promise<UserNotificationViewModel[]>
}
