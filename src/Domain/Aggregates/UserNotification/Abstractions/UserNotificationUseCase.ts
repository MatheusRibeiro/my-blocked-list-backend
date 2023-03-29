import AbstractUseCase from '@src/Domain/Base/Abstractions/UseCase'
import UserNotification from '../UserNotification'
import IUserNotificationRepository from '../IUserNotificationRepository'
import UserNotificationId from '../ValueObjects/UserNotificationId'

export default abstract class UserNotificationUseCase<DTO> extends AbstractUseCase<
    DTO,
    UserNotification,
    UserNotificationId,
    IUserNotificationRepository
> {}
