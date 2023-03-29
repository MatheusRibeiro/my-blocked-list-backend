import { inject, injectable } from 'tsyringe'
import Audit from '@src/Domain/Base/Audit'
import ContactRemoved from '../DomainEvents/ContactRemoved'
import ComplaintRemoved from '../DomainEvents/ComplaintRemoved'
import AbstractContactUseCase from '../Abstractions/ContactUseCase'
import IContactRepository from '../IContactRepository'
import NotFoundError from '@src/Domain/Errors/NotFoundError'
import UUID from '@src/Domain/Base/ValueObject/UUID'

export interface RemoveComplaintDTO {
    contactId: UUID
    complaintId: UUID
}

type RemoveComplaintEvents = ComplaintRemoved | ContactRemoved

const notFoundMessage = 'Complaint was not found.'

@injectable()
export default class CreatePhoneComplaintUseCase extends AbstractContactUseCase<RemoveComplaintDTO> {
    constructor(@inject('ContactRepository') contactRepository: IContactRepository) {
        super(contactRepository)
    }

    public async execute(dto: RemoveComplaintDTO, audit: Audit): Promise<RemoveComplaintEvents[]> {
        const events: RemoveComplaintEvents[] = []
        const { contactId, complaintId } = dto
        const contact = await this.repository.findById(contactId)
        if (contact === null) {
            throw new NotFoundError(notFoundMessage)
        }
        const complaintRemoved = contact.removeComplaint(complaintId, audit.who)
        if (complaintRemoved === null) {
            throw new NotFoundError(notFoundMessage)
        }
        events.push(new ComplaintRemoved(complaintRemoved.toJSON(), contact.toJSON(), audit))

        if (contact.complaints.length === 0) {
            await this.repository.delete(contact)
            events.push(new ContactRemoved(contact.toJSON(), audit))
        } else {
            await this.repository.update(contact)
        }

        return events
    }
}
