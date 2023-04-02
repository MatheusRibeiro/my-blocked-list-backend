import { container } from 'tsyringe'
import RemoveComplaintUseCase, { RemoveComplaintDTO } from '@src/Domain/Aggregates/Contact/UseCases/RemoveComplaint'
import ContactCommand from '../AbstractContactCommand'
import { assertIsUUID } from '@src/Domain/Base/Types/UUID'
import ContactEventDispatcher from '../Events/ContactEventsDispatcher'

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

export default class RemoveComplaintCommand extends ContactCommand<RemoveComplaintRequest, RemoveComplaintDTO> {
    constructor() {
        super(container.resolve(RemoveComplaintUseCase), map, container.resolve(ContactEventDispatcher))
    }
}
