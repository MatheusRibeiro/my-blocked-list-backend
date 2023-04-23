import { container } from 'tsyringe'
import RemoveComplaintUseCase, { RemoveComplaintDTO } from '@src/Domain/Aggregates/Contact/UseCases/RemoveComplaint'
import ContactCommand from '../AbstractContactCommand'
import UUID from '@src/Domain/Base/ValueObject/UUID'
import ContactEventDispatcher from '../Events/ContactEventsDispatcher'

export interface RemoveComplaintRequest {
    contactId: string
    complaintId: string
    userId: string
}
function map(input: RemoveComplaintRequest): RemoveComplaintDTO {
    const contactId = new UUID(input.contactId)
    const complaintId = new UUID(input.complaintId)
    const userId = new UUID(input.userId)

    return {
        contactId,
        complaintId,
        userId,
    }
}

export default class RemoveComplaintCommand extends ContactCommand<RemoveComplaintRequest, RemoveComplaintDTO> {
    constructor() {
        super(container.resolve(RemoveComplaintUseCase), map, container.resolve(ContactEventDispatcher))
    }
}
