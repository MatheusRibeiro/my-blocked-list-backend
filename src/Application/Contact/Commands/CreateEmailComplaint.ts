import { container } from 'tsyringe'
import CreateEmailComplaintUseCase, {
    CreateEmailComplaintDTO,
} from '@src/Domain/Aggregates/Contact/UseCases/CreateEmailComplaint'
import ContactCommand from '../AbstractContactCommand'
import UUID from '@src/Domain/Base/ValueObject/UUID'
import Email from '@src/Domain/Base/ValueObject/Email'
import PersonName from '@src/Domain/Base/ValueObject/PersonName'
import ContactEventDispatcher from '../Events/ContactEventsDispatcher'
import BadRequestError from '@src/Domain/Errors/BadRequestError'

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
    const errors: string[] = []

    const authorId = new UUID(input.authorId)
    const authorIdError = authorId.getError()
    if (authorIdError !== undefined) {
        errors.push(authorIdError)
    }

    const email = new Email(input.email)
    const emailError = email.getError()
    if (emailError !== undefined) {
        errors.push(emailError)
    }
    const personName = new PersonName({ firstName: input.firstName, lastName: input.lastName })
    const personNameError = personName.getError()
    if (personNameError !== undefined) {
        errors.push(personNameError)
    }

    if (errors.length > 0) {
        throw new BadRequestError(`Invalid parameters for CreateEmailComplaint: ${errors.join(', ')}`)
    }

    return {
        personName,
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
