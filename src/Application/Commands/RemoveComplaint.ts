import { container } from 'tsyringe'
import RemovePhoneComplaintUseCase, {
    RemoveComplaintDTO,
} from '@src/Domain/Aggregates/Contact/UseCases/RemovePhoneComplaint'
import ContactCommand from './AbstractContactCommand'

export default class CreatePhoneComplaintCommand extends ContactCommand<RemoveComplaintDTO> {
    constructor() {
        super(container.resolve(RemovePhoneComplaintUseCase))
    }
}
