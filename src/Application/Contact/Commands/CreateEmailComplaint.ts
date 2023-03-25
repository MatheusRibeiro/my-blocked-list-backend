import { container } from 'tsyringe'
import CreateEmailComplaintUseCase, {
    CreateEmailComplaintDTO,
} from '@src/Domain/Aggregates/Contact/UseCases/CreateEmailComplaint'
import ContactCommand from '../AbstractContactCommand'
import Email from '@src/Domain/Base/ValueObject/Email'
import PersonName from '@src/Domain/Base/ValueObject/PersonName'

interface CreateEmailComplaintRequest {
    firstName: string
    lastName: string
    description: string
    complaintCategory: number
    complaintSeverity: number
    email: string
}

function mapper(input: CreateEmailComplaintRequest): CreateEmailComplaintDTO {
    return {
        personName: new PersonName({ firstName: input.firstName, lastName: input.lastName }),
        description: input.description,
        email: new Email(input.email),
        complaintCategory: input.complaintCategory,
        complaintSeverity: input.complaintSeverity,
    }
}

export default class CreateEmailComplaintCommand extends ContactCommand<
    CreateEmailComplaintRequest,
    CreateEmailComplaintDTO
> {
    constructor() {
        super(container.resolve(CreateEmailComplaintUseCase), mapper)
    }
}
