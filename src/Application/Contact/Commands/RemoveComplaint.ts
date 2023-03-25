import { container } from 'tsyringe'
import RemovePhoneComplaintUseCase, {
    RemoveComplaintDTO,
} from '@src/Domain/Aggregates/Contact/UseCases/RemovePhoneComplaint'
import ContactCommand from '../AbstractContactCommand'
import UUID from '@src/Domain/Base/ValueObject/UUID'

export interface RemoveComplaintRequestData {
    contactId: string
    complaintId: string
}
function map(requestData: RemoveComplaintRequestData): RemoveComplaintDTO {
    return {
        contactId: new UUID(requestData.contactId),
        complaintId: new UUID(requestData.complaintId),
    }
}

export default class CreatePhoneComplaintCommand extends ContactCommand<
    RemoveComplaintRequestData,
    RemoveComplaintDTO
> {
    constructor() {
        super(container.resolve(RemovePhoneComplaintUseCase), map)
    }
}
