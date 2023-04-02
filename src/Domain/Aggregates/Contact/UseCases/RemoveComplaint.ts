import { inject, injectable } from 'tsyringe'
import Audit from '@src/Domain/Base/Audit'
import ContactRemoved from '../DomainEvents/ContactRemoved'
import ComplaintRemoved from '../DomainEvents/ComplaintRemoved'
import AbstractContactUseCase from '../Abstractions/ContactUseCase'
import IContactRepository from '../IContactRepository'
import UUID from '@src/Domain/Base/Types/UUID'

export interface RemoveComplaintDTO {
    contactId: UUID
    complaintId: UUID
    userId: UUID
}

type RemoveComplaintEvents = ComplaintRemoved | ContactRemoved

@injectable()
export default class RemoveComplaintUseCase extends AbstractContactUseCase<RemoveComplaintDTO> {
    constructor(@inject('ContactRepository') contactRepository: IContactRepository) {
        super(contactRepository)
    }

    public async execute(dto: RemoveComplaintDTO, audit: Audit): Promise<RemoveComplaintEvents[]> {
        const events: RemoveComplaintEvents[] = []
        const { contactId, complaintId, userId } = dto
        const contact = await this.repository.findById(contactId)
        if (contact === null) {
            return []
        }
        const complaintRemoved = contact.removeComplaint(complaintId, userId)
        if (complaintRemoved === null) {
            return []
        }
        events.push(new ComplaintRemoved(complaintRemoved.toJSON(), contact.toJSON(), audit))

        if (contact.getComplaints().length === 0) {
            await this.repository.delete(contact)
            events.push(new ContactRemoved(contact.toJSON(), audit))
        } else {
            await this.repository.update(contact)
        }

        return events
    }
}
