import { container } from 'tsyringe'
import CreateEmailComplaintUseCase, {
    CreateEmailComplaintDTO,
} from '@src/Domain/Aggregates/Contact/UseCases/CreateEmailComplaint'
import ContactCommand from './AbstractContactCommand'
import Email from '@src/Domain/Base/ValueObject/Email'
import PersonName from '@src/Domain/Base/ValueObject/PersonName'

interface CreateEmailComplaintRequestData {
    firstName: string
    lastName: string
    description: string
    complaintCategory: number
    complaintSeverity: number
    email: string
}

function mapper(requestData: CreateEmailComplaintRequestData): CreateEmailComplaintDTO {
    const personName = new PersonName({ firstName: requestData.firstName, lastName: requestData.lastName })
    const email = new Email(requestData.email)
    return {
        personName,
        description: requestData.description,
        email,
        complaintCategory: requestData.complaintCategory,
        complaintSeverity: requestData.complaintSeverity,
    }
}

export default class CreateEmailComplaintCommand extends ContactCommand<
    CreateEmailComplaintRequestData,
    CreateEmailComplaintDTO
> {
    constructor() {
        super(container.resolve(CreateEmailComplaintUseCase), mapper)
    }
}
