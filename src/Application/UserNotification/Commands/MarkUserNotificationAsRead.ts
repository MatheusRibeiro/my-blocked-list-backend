import { container } from 'tsyringe'
import UserNotificationCommand from '../AbstrctUserNotificationCommand'
import MarkUserNotificationAsReadUseCase, {
    MarkUserNotificationAsReadDTO,
} from '@src/Domain/Aggregates/UserNotification/UseCases/MarkUserNotificationAsRead'
import { assertIsUUID } from '@src/Domain/Base/Types/UUID'
import UserNotificationEventDispatcher from '../Events/UserNotificationEventsDispatcher'

interface MarkUserNotificationAsReadRequestData {
    userNotificationId: string
}

function mapper(input: MarkUserNotificationAsReadRequestData): MarkUserNotificationAsReadDTO {
    assertIsUUID(input.userNotificationId)
    return {
        userNotificationId: input.userNotificationId,
    }
}

export default class MarkUserNotificationAsReadCommand extends UserNotificationCommand<
    MarkUserNotificationAsReadRequestData,
    MarkUserNotificationAsReadDTO
> {
    constructor() {
        super(
            container.resolve(MarkUserNotificationAsReadUseCase),
            mapper,
            container.resolve(UserNotificationEventDispatcher)
        )
    }
}
