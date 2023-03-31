import { container } from 'tsyringe'
import UserNotificationCommand from '../AbstrctUserNotificationCommand'
import UUID from '@src/Domain/Base/ValueObject/UUID'
import CreateUserNotificationUseCase, {
    CreateUserNotificationDTO,
} from '@src/Domain/Aggregates/UserNotification/UseCases/CreateUserNotification'
import { UserNotificatonPayload } from '@src/Domain/Aggregates/UserNotification/UserNotification'

interface CreateUserNotificationRequestData {
    userId: string
    authorId: string
    payload: UserNotificatonPayload
    userNotificationType: string
}

function mapper(input: CreateUserNotificationRequestData): CreateUserNotificationDTO {
    return {
        userId: new UUID(input.userId),
        authorId: new UUID(input.authorId),
        payload: input.payload,
        userNotificationType: input.userNotificationType,
    }
}

export default class CreateUserNotificationCommand extends UserNotificationCommand<
    CreateUserNotificationRequestData,
    CreateUserNotificationDTO
> {
    constructor() {
        super(container.resolve(CreateUserNotificationUseCase), mapper)
    }
}
