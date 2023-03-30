import { container } from 'tsyringe'
import RemovePhoneComplaintUseCase, {
    RemoveComplaintDTO,
} from '@src/Domain/Aggregates/Contact/UseCases/RemovePhoneComplaint'
import ContactCommand from '../AbstractContactCommand'
import UUID from '@src/Domain/Base/ValueObject/UUID'

export interface RemoveComplaintRequest {
    contactId: string
    complaintId: string
    userId: string
}
function map(input: RemoveComplaintRequest): RemoveComplaintDTO {
    return {
        contactId: new UUID(input.contactId),
        complaintId: new UUID(input.complaintId),
        userId: new UUID(input.userId),
    }
}

export default class CreatePhoneComplaintCommand extends ContactCommand<RemoveComplaintRequest, RemoveComplaintDTO> {
    constructor() {
        super(container.resolve(RemovePhoneComplaintUseCase), map)
    }
}
