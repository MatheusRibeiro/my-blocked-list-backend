import AbstractUseCase from '@src/Domain/Base/AbstractUseCase'
import UserNotification from '../UserNotification'
import IUserNotificationRepository from '../IUserNotificationRepository'
import UserNotificationId from '../ValueObjects/UserNotificationId'

export default abstract class AbstractUserNotificationUseCase<DTO> extends AbstractUseCase<
    DTO,
    UserNotification,
    UserNotificationId,
    IUserNotificationRepository
> {}
