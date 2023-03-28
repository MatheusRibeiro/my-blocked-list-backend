import { inject, injectable } from 'tsyringe'
import Audit from '@src/Domain/Base/Audit'
import UUID, { uuidFactory } from '@src/Domain/Base/ValueObject/UUID'
import UserNotificationCreated from '../DomainEvents/UserNotificationCreated'
import IUserNotificationRepository from '../IUserNotificationRepository'
import UserNotification from '../UserNotification'
import AbstractUserNotificationUseCase from './AbstractUserNotificationUseCase'
import UserNotificationType from '../ValueObjects/UserNotificationType'

export interface NotifyUsersAboutComplaintDTO {
    users: UUID[]
    payload: object
}

type CreateUserNotificationEvents = UserNotificationCreated

@injectable()
export default class NotifyUsersAboutComplaintUseCase extends AbstractUserNotificationUseCase<NotifyUsersAboutComplaintDTO> {
    constructor(@inject('UserNotificationRepository') userNotificationRepository: IUserNotificationRepository) {
        super(userNotificationRepository)
    }

    public async execute(dto: NotifyUsersAboutComplaintDTO, audit: Audit): Promise<CreateUserNotificationEvents[]> {
        const { users, payload } = dto
        const events: CreateUserNotificationEvents[] = []
        for (const userId of users) {
            const userNotification = new UserNotification(
                uuidFactory(),
                userId,
                audit.who,
                new UserNotificationType('ContactReported'),
                payload
            )
            await this.repository.create(userNotification)
            events.push(new UserNotificationCreated({ user_notification_created: userNotification.toJSON() }, audit))
        }
        return events
    }
}
