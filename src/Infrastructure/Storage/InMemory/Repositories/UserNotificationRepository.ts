import IUserNotificationRepository from '@src/Domain/Aggregates/UserNotification/IUserNotificationRepository'
import UserNotification from '@src/Domain/Aggregates/UserNotification/UserNotification'
import UserNotificationId from '@src/Domain/Aggregates/UserNotification/ValueObjects/UserNotificationId'
import InMemoryRepository from './InMemoryRepository'

export default class UserNotificationInMemoryRepository
    extends InMemoryRepository<UserNotification, UserNotificationId>
    implements IUserNotificationRepository {}
