import { container } from 'tsyringe'
import UserNotificationCommand from '../AbstrctUserNotificationCommand'
import DeleteUserNotificationUseCase, {
    DeleteUserNotificationDTO,
} from '@src/Domain/Aggregates/UserNotification/UseCases/DeleteUserNotification'
import UUID from '@src/Domain/Base/ValueObject/UUID'
import UserNotificationEventDispatcher from '../Events/UserNotificationEventsDispatcher'

interface DeleteUserNotificationRequestData {
    userNotificationId: string
}

function mapper(input: DeleteUserNotificationRequestData): DeleteUserNotificationDTO {
    const userNotificationId = new UUID(input.userNotificationId)

    return {
        userNotificationId,
    }
}

export default class DeleteUserNotificationCommand extends UserNotificationCommand<
    DeleteUserNotificationRequestData,
    DeleteUserNotificationDTO
> {
    constructor() {
        super(
            container.resolve(DeleteUserNotificationUseCase),
            mapper,
            container.resolve(UserNotificationEventDispatcher)
        )
    }
}
