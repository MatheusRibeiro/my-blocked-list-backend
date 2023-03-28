import IRepository from '@src/Domain/Base/AbstractRepository'
import UserNotification from './UserNotification'
import UserNotificationId from './ValueObjects/UserNotificationId'

export default interface IUserNotificationRepository extends IRepository<UserNotification, UserNotificationId> {}
