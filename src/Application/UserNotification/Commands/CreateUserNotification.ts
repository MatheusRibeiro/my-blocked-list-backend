import { container } from 'tsyringe'
import UserNotificationCommand from '../AbstrctUserNotificationCommand'
import UUID from '@src/Domain/Base/ValueObject/UUID'
import CreateUserNotificationUseCase, {
    CreateUserNotificationDTO,
} from '@src/Domain/Aggregates/UserNotification/UseCases/CreateUserNotification'
import { UserNotificatonPayload } from '@src/Domain/Aggregates/UserNotification/UserNotification'
import UserNotificationEventDispatcher from '../Events/UserNotificationEventsDispatcher'

interface CreateUserNotificationRequestData {
    userId: string
    authorId: string
    payload: UserNotificatonPayload
    userNotificationType: string
}

function mapper(input: CreateUserNotificationRequestData): CreateUserNotificationDTO {
    const userId = new UUID(input.userId)
    const authorId = new UUID(input.authorId)

    return {
        userId,
        authorId,
        payload: input.payload,
        userNotificationType: input.userNotificationType,
    }
}

export default class CreateUserNotificationCommand extends UserNotificationCommand<
    CreateUserNotificationRequestData,
    CreateUserNotificationDTO
> {
    constructor() {
        super(
            container.resolve(CreateUserNotificationUseCase),
            mapper,
            container.resolve(UserNotificationEventDispatcher)
        )
    }
}
