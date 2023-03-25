import { container } from 'tsyringe'
import CreatePhoneComplaintUseCase, {
    CreatePhoneComplaintDTO,
} from '@src/Domain/Aggregates/Contact/UseCases/CreatePhoneComplaint'
import ContactCommand from './AbstractContactCommand'
import AbstractMapper from '../Base/AbstractMapper'
import Phone from '@src/Domain/Base/ValueObject/Phone'

interface CreatePhoneComplaintRequestData {
    firstName: string
    lastName: string
    description: string
    complaintCategory: number
    complaintSeverity: number
    phone: string
}

type Mapper = AbstractMapper<CreatePhoneComplaintRequestData, CreatePhoneComplaintDTO>

function mapper(requestData: CreatePhoneComplaintRequestData): CreatePhoneComplaintDTO {
    const phone = new Phone(requestData.phone)
    return Object.assign({}, requestData, { phone })
}

export default class CreatePhoneComplaintCommand extends ContactCommand<
    CreatePhoneComplaintRequestData,
    CreatePhoneComplaintDTO,
    Mapper
> {
    constructor() {
        super(container.resolve(CreatePhoneComplaintUseCase), mapper)
    }
}
