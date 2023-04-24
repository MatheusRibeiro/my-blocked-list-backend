import { container } from 'tsyringe'
import CreateEmailComplaintUseCase, {
    CreateEmailComplaintDTO,
} from '@src/Domain/Aggregates/Contact/UseCases/CreateEmailComplaint'
import ContactCommand from '../AbstractContactCommand'
import UUID from '@src/Domain/Base/ValueObject/UUID'
import Email from '@src/Domain/Base/ValueObject/Email'
import PersonName from '@src/Domain/Base/ValueObject/PersonName'
import ContactEventDispatcher from '../Events/ContactEventsDispatcher'

interface CreateEmailComplaintRequest {
    firstName: string
    lastName: string
    description: string
    complaintCategory: string
    complaintSeverity: string
    email: string
    authorId: string
}

function mapper(input: CreateEmailComplaintRequest): CreateEmailComplaintDTO {
    const authorId = new UUID(input.authorId)
    const email = new Email(input.email)
    const personName = new PersonName({ firstName: input.firstName, lastName: input.lastName })

    return {
        personName: personName.getValidatedInstance(),
        description: input.description,
        email,
        complaintCategory: input.complaintCategory,
        complaintSeverity: input.complaintSeverity,
        authorId,
    }
}

export default class CreateEmailComplaintCommand extends ContactCommand<
    CreateEmailComplaintRequest,
    CreateEmailComplaintDTO
> {
    constructor() {
        super(container.resolve(CreateEmailComplaintUseCase), mapper, container.resolve(ContactEventDispatcher))
    }
}
