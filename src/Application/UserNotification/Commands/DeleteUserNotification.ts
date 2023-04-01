import { container } from 'tsyringe'
import UserNotificationCommand from '../AbstrctUserNotificationCommand'
import DeleteUserNotificationUseCase, {
    DeleteUserNotificationDTO,
} from '@src/Domain/Aggregates/UserNotification/UseCases/DeleteUserNotification'
import { assertIsUUID } from '@src/Domain/Base/Types/UUID'

interface DeleteUserNotificationRequestData {
    userNotificationId: string
}

function mapper(input: DeleteUserNotificationRequestData): DeleteUserNotificationDTO {
    assertIsUUID(input.userNotificationId)

    return {
        userNotificationId: input.userNotificationId,
    }
}

export default class DeleteUserNotificationCommand extends UserNotificationCommand<
    DeleteUserNotificationRequestData,
    DeleteUserNotificationDTO
> {
    constructor() {
        super(container.resolve(DeleteUserNotificationUseCase), mapper)
    }
}
