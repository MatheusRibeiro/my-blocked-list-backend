import { container } from 'tsyringe'
import UserNotification from '@src/Domain/Aggregates/UserNotification/UserNotification'
import UserNotificationId from '@src/Domain/Aggregates/UserNotification/ValueObjects/UserNotificationId'
import AbstractCommand from '../Base/AbstractCommand'
import AbstractUserNotificationUseCase from '@src/Domain/Aggregates/UserNotification/UseCases/AbstractUserNotificationUseCase'
import AbstractMapper from '../Base/AbstractMapper'
import IUserNotificationRepository from '@src/Domain/Aggregates/UserNotification/IUserNotificationRepository'
import UserNotificationEventDispatcher from './Events/UserNotificationEventsDispatcher'

export default abstract class UserNotificationCommand<RequestData, UseCaseInput> extends AbstractCommand<
    RequestData,
    UseCaseInput,
    AbstractMapper<RequestData, UseCaseInput>,
    UserNotification,
    UserNotificationId,
    IUserNotificationRepository,
    AbstractUserNotificationUseCase<UseCaseInput>
> {
    protected readonly eventDispatcher = container.resolve(UserNotificationEventDispatcher)
}
