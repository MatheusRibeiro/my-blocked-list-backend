import UserNotification from '@src/Domain/Aggregates/UserNotification/UserNotification'
import UserNotificationId from '@src/Domain/Aggregates/UserNotification/ValueObjects/UserNotificationId'
import AbstractCommand from '../Base/AbstractCommand'
import UserNotificationUseCase from '@src/Domain/Aggregates/UserNotification/Abstractions/UserNotificationUseCase'
import IUserNotificationRepository from '@src/Domain/Aggregates/UserNotification/IUserNotificationRepository'
import UserNotificationEventDispatcher from './Events/UserNotificationEventsDispatcher'

export default abstract class UserNotificationCommand<RequestData, UseCaseInput> extends AbstractCommand<
    RequestData,
    UseCaseInput,
    UserNotification,
    UserNotificationId,
    IUserNotificationRepository,
    UserNotificationUseCase<UseCaseInput>,
    UserNotificationEventDispatcher
> {}
