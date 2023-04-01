import { inject, injectable } from 'tsyringe'
import Audit from '@src/Domain/Base/Audit'
import NotFoundError from '@src/Domain/Errors/NotFoundError'
import UUID from '@src/Domain/Base/Types/UUID'
import UserNotificationDeleted from '../DomainEvents/UserNotificationDeleted'
import AbstractUserNotificationUseCase from '../Abstractions/UserNotificationUseCase'
import IUserNotificationRepository from '../IUserNotificationRepository'

export interface DeleteUserNotificationDTO {
    userNotificationId: UUID
}

type DeleteUserNotificationEvents = UserNotificationDeleted

const notFoundMessage = 'Notification was not found.'

@injectable()
export default class DeleteUserNotificationUseCase extends AbstractUserNotificationUseCase<DeleteUserNotificationDTO> {
    constructor(@inject('UserNotificationRepository') repository: IUserNotificationRepository) {
        super(repository)
    }

    public async execute(dto: DeleteUserNotificationDTO, audit: Audit): Promise<DeleteUserNotificationEvents[]> {
        const events: DeleteUserNotificationEvents[] = []
        const { userNotificationId } = dto
        const notification = await this.repository.findById(userNotificationId)
        if (notification === null) {
            throw new NotFoundError(notFoundMessage)
        }
        if (notification.userId !== audit.who) {
            throw new NotFoundError(notFoundMessage)
        }
        await this.repository.delete(notification)
        events.push(new UserNotificationDeleted(notification.toJSON(), audit))

        return events
    }
}
