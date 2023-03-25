import { container } from 'tsyringe'
import CreatePhoneComplaintUseCase, {
    CreatePhoneComplaintDTO,
} from '@src/Domain/Aggregates/Contact/UseCases/CreatePhoneComplaint'
import ContactCommand from '../AbstractContactCommand'
import Phone from '@src/Domain/Base/ValueObject/Phone'
import PersonName from '@src/Domain/Base/ValueObject/PersonName'

interface CreatePhoneComplaintRequestData {
    firstName: string
    lastName: string
    description: string
    complaintCategory: number
    complaintSeverity: number
    phone: string
}

function mapper(input: CreatePhoneComplaintRequestData): CreatePhoneComplaintDTO {
    return {
        personName: new PersonName({ firstName: input.firstName, lastName: input.lastName }),
        description: input.description,
        phone: new Phone(input.phone),
        complaintCategory: input.complaintCategory,
        complaintSeverity: input.complaintSeverity,
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
