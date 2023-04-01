import { inject, injectable } from 'tsyringe'
import Audit from '@src/Domain/Base/Audit'
import NotFoundError from '@src/Domain/Errors/NotFoundError'
import UUID from '@src/Domain/Base/Types/UUID'
import UserNotificationRead from '../DomainEvents/UserNotificationRead'
import AbstractUserNotificationUseCase from '../Abstractions/UserNotificationUseCase'
import IUserNotificationRepository from '../IUserNotificationRepository'

export interface MarkUserNotificationAsReadDTO {
    userNotificationId: UUID
}

type MarkUserNotificationAsReadEvents = UserNotificationRead

const notFoundMessage = 'Notification was not found.'

@injectable()
export default class MarkUserNotificationAsReadUseCase extends AbstractUserNotificationUseCase<MarkUserNotificationAsReadDTO> {
    constructor(@inject('UserNotificationRepository') repository: IUserNotificationRepository) {
        super(repository)
    }

    public async execute(
        dto: MarkUserNotificationAsReadDTO,
        audit: Audit
    ): Promise<MarkUserNotificationAsReadEvents[]> {
        const events: MarkUserNotificationAsReadEvents[] = []
        const { userNotificationId } = dto
        const notification = await this.repository.findById(userNotificationId)
        if (notification === null) {
            throw new NotFoundError(notFoundMessage)
        }
        if (notification.userId === audit.who) {
            throw new NotFoundError(notFoundMessage)
        }
        notification.markAsRead()
        await this.repository.update(notification)
        events.push(new UserNotificationRead(notification.toJSON(), audit))

        return events
    }
}
