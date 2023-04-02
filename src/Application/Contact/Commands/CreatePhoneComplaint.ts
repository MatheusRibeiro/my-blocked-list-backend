import { container } from 'tsyringe'
import CreatePhoneComplaintUseCase, {
    CreatePhoneComplaintDTO,
} from '@src/Domain/Aggregates/Contact/UseCases/CreatePhoneComplaint'
import ContactCommand from '../AbstractContactCommand'
import { assertIsUUID } from '@src/Domain/Base/Types/UUID'
import { assertIsPhone } from '@src/Domain/Base/Types/Phone'
import PersonName from '@src/Domain/Base/ValueObject/PersonName'
import ContactEventDispatcher from '../Events/ContactEventsDispatcher'

interface CreatePhoneComplaintRequestData {
    firstName: string
    lastName: string
    description: string
    complaintCategory: string
    complaintSeverity: string
    phone: string
    authorId: string
}

function mapper(input: CreatePhoneComplaintRequestData): CreatePhoneComplaintDTO {
    assertIsUUID(input.authorId)
    assertIsPhone(input.phone)
    return {
        personName: new PersonName({ firstName: input.firstName, lastName: input.lastName }),
        description: input.description,
        phone: input.phone,
        complaintCategory: input.complaintCategory,
        complaintSeverity: input.complaintSeverity,
        authorId: input.authorId,
    }
}

export default class CreatePhoneComplaintCommand extends ContactCommand<
    CreatePhoneComplaintRequestData,
    CreatePhoneComplaintDTO
> {
    constructor() {
        super(container.resolve(CreatePhoneComplaintUseCase), mapper, container.resolve(ContactEventDispatcher))
    }
}
