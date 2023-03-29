import IRepository from '@src/Domain/Base/Abstractions/Repository'
import UserNotification from './UserNotification'
import UserNotificationId from './ValueObjects/UserNotificationId'

export default interface IUserNotificationRepository extends IRepository<UserNotification, UserNotificationId> {}
