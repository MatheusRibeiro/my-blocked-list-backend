import { inject, injectable } from 'tsyringe'
import Audit from '@src/Domain/Base/Audit'
import UUID from '@src/Domain/Base/ValueObject/UUID'
import UserNotificationCreated from '../DomainEvents/UserNotificationCreated'
import AbstractUserNotificationUseCase from '../Abstractions/UserNotificationUseCase'
import IUserNotificationRepository from '../IUserNotificationRepository'
import UserNotification, { UserNotificatonPayload } from '../UserNotification'
import { assertIsUserNotificationType } from '../ValueObjects/UserNotificationType'

export interface CreateUserNotificationDTO {
    userNotificationType: string
    userId: UUID
    authorId: UUID
    payload: UserNotificatonPayload
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

        assertIsUserNotificationType(userNotificationType)
        const notification = new UserNotification(UUID.generate(), userId, authorId, userNotificationType, payload)

        await this.repository.create(notification)
        events.push(new UserNotificationCreated(notification.toJSON(), audit))

        return events
    }
}
