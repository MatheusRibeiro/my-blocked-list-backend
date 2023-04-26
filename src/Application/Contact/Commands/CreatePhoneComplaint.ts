import { container } from 'tsyringe'
import CreatePhoneComplaintUseCase, {
    CreatePhoneComplaintDTO,
} from '@src/Domain/Aggregates/Contact/UseCases/CreatePhoneComplaint'
import ContactCommand from '../AbstractContactCommand'
import UUID from '@src/Domain/Base/ValueObject/UUID'
import Phone from '@src/Domain/Base/ValueObject/Phone'
import PersonName from '@src/Domain/Base/ValueObject/PersonName'
import ContactEventDispatcher from '../Events/ContactEventsDispatcher'
import BadRequestError from '@src/Domain/Errors/BadRequestError'

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
    const errors: string[] = []

    const authorId = new UUID(input.authorId)
    const authorIdError = authorId.getError()
    if (authorIdError !== undefined) {
        errors.push(authorIdError)
    }

    const phone = new Phone(input.phone)
    const phoneError = phone.getError()
    if (phoneError !== undefined) {
        errors.push(phoneError)
    }
    const personName = new PersonName({ firstName: input.firstName, lastName: input.lastName })
    const personNameError = personName.getError()
    if (personNameError !== undefined) {
        errors.push(personNameError)
    }

    if (errors.length > 0) {
        throw new BadRequestError(`Invalid parameters for CreatePhoneComplaint: [${errors.join(', ')}]`)
    }

    return {
        personName,
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
