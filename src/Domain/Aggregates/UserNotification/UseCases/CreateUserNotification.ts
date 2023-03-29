import { inject, injectable } from 'tsyringe'
import Audit from '@src/Domain/Base/Audit'
import UUID, { uuidFactory } from '@src/Domain/Base/ValueObject/UUID'
import UserNotificationCreated from '../DomainEvents/UserNotificationCreated'
import AbstractUserNotificationUseCase from './AbstractUserNotificationUseCase'
import IUserNotificationRepository from '../IUserNotificationRepository'
import UserNotification from '../UserNotification'
import UserNotificationType from '../ValueObjects/UserNotificationType'

export interface CreateUserNotificationDTO {
    userNotificationType: string
    userId: UUID
    authorId: UUID
    payload: object
}

type CreateUserNotificationEvents = UserNotificationCreated

@injectable()
export default class CreateUserNotificationUseCase extends AbstractUserNotificationUseCase<CreateUserNotificationDTO> {
    constructor(@inject('UserNotificationRepository') repository: IUserNotificationRepository) {
        super(repository)
    }

    public async execute(dto: CreateUserNotificationDTO, audit: Audit): Promise<CreateUserNotificationEvents[]> {
        const events: CreateUserNotificationEvents[] = []
        const { userId, authorId, payload, userNotificationType } = dto
        const notificationType = new UserNotificationType(userNotificationType)
        const notification = new UserNotification(uuidFactory(), userId, authorId, notificationType, payload)

        await this.repository.create(notification)
        events.push(new UserNotificationCreated(notification.toJSON(), audit))

        return events
    }
}
