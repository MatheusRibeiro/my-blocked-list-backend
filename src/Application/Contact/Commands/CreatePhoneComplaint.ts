import { container } from 'tsyringe'
import CreatePhoneComplaintUseCase, {
    CreatePhoneComplaintDTO,
} from '@src/Domain/Aggregates/Contact/UseCases/CreatePhoneComplaint'
import ContactCommand from '../AbstractContactCommand'
import { assertIsPhone } from '@src/Domain/Base/Types/Phone'
import PersonName from '@src/Domain/Base/ValueObject/PersonName'
import UUID from '@src/Domain/Base/ValueObject/UUID'

interface CreatePhoneComplaintRequestData {
    firstName: string
    lastName: string
    description: string
    complaintCategory: number
    complaintSeverity: number
    phone: string
    authorId: string
}

function mapper(input: CreatePhoneComplaintRequestData): CreatePhoneComplaintDTO {
    assertIsPhone(input.phone)
    return {
        personName: new PersonName({ firstName: input.firstName, lastName: input.lastName }),
        description: input.description,
        phone: input.phone,
        complaintCategory: input.complaintCategory,
        complaintSeverity: input.complaintSeverity,
        authorId: new UUID(input.authorId),
    }
}

export default class CreatePhoneComplaintCommand extends ContactCommand<
    CreatePhoneComplaintRequestData,
    CreatePhoneComplaintDTO
> {
    constructor() {
        super(container.resolve(CreatePhoneComplaintUseCase), mapper)
    }
}
