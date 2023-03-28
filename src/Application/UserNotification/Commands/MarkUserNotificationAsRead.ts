import { container } from 'tsyringe'
import UserNotificationCommand from '../AbstrctUserNotificationCommand'
import MarkUserNotificationAsReadUseCase, {
    MarkUserNotificationAsReadDTO,
} from '@src/Domain/Aggregates/UserNotification/UseCases/MarkUserNotificationAsRead'
import UUID from '@src/Domain/Base/ValueObject/UUID'

interface MarkUserNotificationAsReadRequestData {
    userNotificationId: string
}

function mapper(input: MarkUserNotificationAsReadRequestData): MarkUserNotificationAsReadDTO {
    return {
        userNotificationId: new UUID(input.userNotificationId),
    }
}

export default class MarkUserNotificationAsReadCommand extends UserNotificationCommand<
    MarkUserNotificationAsReadRequestData,
    MarkUserNotificationAsReadDTO
> {
    constructor() {
        super(container.resolve(MarkUserNotificationAsReadUseCase), mapper)
    }
}
