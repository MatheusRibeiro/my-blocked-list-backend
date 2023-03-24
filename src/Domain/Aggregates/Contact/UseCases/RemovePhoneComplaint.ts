import { inject, injectable } from 'tsyringe'
import Audit from '@src/Domain/Base/Audit'
import ContactRemoved from '../DomainEvents/ContactRemoved'
import ComplaintRemoved from '../DomainEvents/ComplaintRemoved'
import AbstractContactUseCase from './AbstractContactUseCase'
import IContactRepository from '../IContactRepository'
import ComplaintId from '../Complaint/ValueObjects/ComplaintId'
import ContactId from '../ValueObjects/ContactId'
import NotFoundError from '@src/Domain/Errors/NotFoundError'

export interface RemoveComplaintDTO {
    contactId: string
    complaintId: string
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

        const contact = await this.repository.findById(new ContactId(dto.contactId))
        if (contact === null) {
            throw new NotFoundError(notFoundMessage)
        }
        const complaintRemoved = contact.removeComplaint(new ComplaintId(dto.complaintId), audit.who)
        if (complaintRemoved === null) {
            throw new NotFoundError(notFoundMessage)
        }
        events.push(new ComplaintRemoved({ complaint: complaintRemoved.toJSON() }, audit))

        if (contact.complaints.length === 0) {
            await this.repository.delete(contact)
            events.push(new ContactRemoved({ contact: contact.toJSON() }, audit))
        } else {
            await this.repository.update(contact)
        }

        return events
    }
}
