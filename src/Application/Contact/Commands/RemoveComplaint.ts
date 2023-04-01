import { container } from 'tsyringe'
import RemovePhoneComplaintUseCase, {
    RemoveComplaintDTO,
} from '@src/Domain/Aggregates/Contact/UseCases/RemovePhoneComplaint'
import ContactCommand from '../AbstractContactCommand'
import { assertIsUUID } from '@src/Domain/Base/Types/UUID'

export interface RemoveComplaintRequest {
    contactId: string
    complaintId: string
    userId: string
}
function map(input: RemoveComplaintRequest): RemoveComplaintDTO {
    assertIsUUID(input.contactId)
    assertIsUUID(input.complaintId)
    assertIsUUID(input.userId)

    return {
        contactId: input.contactId,
        complaintId: input.complaintId,
        userId: input.userId,
    }
}

export default class CreatePhoneComplaintCommand extends ContactCommand<RemoveComplaintRequest, RemoveComplaintDTO> {
    constructor() {
        super(container.resolve(RemovePhoneComplaintUseCase), map)
    }
}
