import { container } from 'tsyringe'
import CreatePhoneComplaintUseCase, {
    CreatePhoneComplaintDTO,
} from '@src/Domain/Aggregates/Contact/UseCases/CreatePhoneComplaint'
import ContactCommand from './AbstractContactCommand'

export default class CreatePhoneComplaintCommand extends ContactCommand<CreatePhoneComplaintDTO> {
    constructor() {
        super(container.resolve(CreatePhoneComplaintUseCase))
    }
}
