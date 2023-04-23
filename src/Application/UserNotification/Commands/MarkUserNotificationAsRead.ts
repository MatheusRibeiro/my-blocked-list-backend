import { container } from 'tsyringe'
import UserNotificationCommand from '../AbstrctUserNotificationCommand'
import MarkUserNotificationAsReadUseCase, {
    MarkUserNotificationAsReadDTO,
} from '@src/Domain/Aggregates/UserNotification/UseCases/MarkUserNotificationAsRead'
import UUID from '@src/Domain/Base/ValueObject/UUID'
import UserNotificationEventDispatcher from '../Events/UserNotificationEventsDispatcher'

interface MarkUserNotificationAsReadRequestData {
    userNotificationId: string
}

function mapper(input: MarkUserNotificationAsReadRequestData): MarkUserNotificationAsReadDTO {
    const userNotificationId = new UUID(input.userNotificationId)
    return {
        userNotificationId,
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
