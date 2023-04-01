import { container } from 'tsyringe'
import CreateEmailComplaintUseCase, {
    CreateEmailComplaintDTO,
} from '@src/Domain/Aggregates/Contact/UseCases/CreateEmailComplaint'
import ContactCommand from '../AbstractContactCommand'
import { assertIsUUID } from '@src/Domain/Base/Types/UUID'
import { assertIsEmail } from '@src/Domain/Base/Types/Email'
import PersonName from '@src/Domain/Base/ValueObject/PersonName'

interface CreateEmailComplaintRequest {
    firstName: string
    lastName: string
    description: string
    complaintCategory: number
    complaintSeverity: number
    email: string
    authorId: string
}

function mapper(input: CreateEmailComplaintRequest): CreateEmailComplaintDTO {
    assertIsEmail(input.email)
    assertIsUUID(input.authorId)

    return {
        personName: new PersonName({ firstName: input.firstName, lastName: input.lastName }),
        description: input.description,
        email: input.email,
        complaintCategory: input.complaintCategory,
        complaintSeverity: input.complaintSeverity,
        authorId: input.authorId,
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
