import { container } from 'tsyringe'
import CreatePhoneComplaintUseCase, {
    CreatePhoneComplaintDTO,
} from '@src/Domain/Aggregates/Contact/UseCases/CreatePhoneComplaint'
import ContactCommand from '../AbstractContactCommand'
import UUID from '@src/Domain/Base/ValueObject/UUID'
import Phone from '@src/Domain/Base/ValueObject/Phone'
import PersonName from '@src/Domain/Base/ValueObject/PersonName'
import ContactEventDispatcher from '../Events/ContactEventsDispatcher'

interface CreatePhoneComplaintRequest {
    firstName: string
    lastName: string
    description: string
    complaintCategory: string
    complaintSeverity: string
    phone: string
    authorId: string
}

function mapper(input: CreatePhoneComplaintRequest): CreatePhoneComplaintDTO {
    const authorId = new UUID(input.authorId)
    const phone = new Phone(input.phone)

    return {
        personName: new PersonName({ firstName: input.firstName, lastName: input.lastName }),
        description: input.description,
        phone,
        complaintCategory: input.complaintCategory,
        complaintSeverity: input.complaintSeverity,
        authorId,
    }
}

export default class CreatePhoneComplaintCommand extends ContactCommand<
    CreatePhoneComplaintRequest,
    CreatePhoneComplaintDTO
> {
    constructor() {
        super(container.resolve(CreatePhoneComplaintUseCase), mapper, container.resolve(ContactEventDispatcher))
    }
}
