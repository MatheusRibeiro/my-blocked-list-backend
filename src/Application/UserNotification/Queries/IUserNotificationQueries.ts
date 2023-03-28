export interface UserNotificationViewModel {
    id: string
    type: string
    author: { id: string }
    payload: object
    isRead: boolean
}
export interface GetUserNotificationsQuery {
    userId: string
}

export default interface IComplaintQueries {
    getUserNotifications: (params: GetUserNotificationsQuery) => Promise<UserNotificationViewModel[]>
}
