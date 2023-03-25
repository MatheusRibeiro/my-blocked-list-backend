import { inject, injectable } from 'tsyringe'
import Audit from '@src/Domain/Base/Audit'
import Phone from '@src/Domain/Base/ValueObject/Phone'
import { complaintFactoryWithoutId } from '../Complaint/ComplaintFactory'
import { contactFactoryWithoutId } from '../ContactFactory'
import ContactCreated from '../DomainEvents/ContactCreated'
import ContactReported from '../DomainEvents/ContactReported'
import AbstractContactUseCase from './AbstractContactUseCase'
import IContactRepository from '../IContactRepository'
import PersonName from '@src/Domain/Base/ValueObject/PersonName'

export interface CreatePhoneComplaintDTO {
    personName: PersonName
    description: string
    complaintCategory: number
    complaintSeverity: number
    phone: Phone
}

type CreateComplaintEvents = ContactCreated | ContactReported

@injectable()
export default class CreatePhoneComplaintUseCase extends AbstractContactUseCase<CreatePhoneComplaintDTO> {
    constructor(@inject('ContactRepository') contactRepository: IContactRepository) {
        super(contactRepository)
    }

    public async execute(dto: CreatePhoneComplaintDTO, audit: Audit): Promise<CreateComplaintEvents[]> {
        const { personName, description, complaintCategory, complaintSeverity, phone } = dto
        const complaint = complaintFactoryWithoutId({
            description,
            category: complaintCategory,
            severity: complaintSeverity,
            authorId: audit.who.value,
        })
        const existingContact = await this.repository.findByPhone(phone)
        const contact = existingContact === null ? contactFactoryWithoutId({ phone, personName }) : existingContact

        contact.addComplaint(complaint)
        const contactReportedEvent = new ContactReported(
            { contact_reported: contact.toJSON(), complaint: complaint.toJSON() },
            audit
        )

        if (existingContact === null) {
            await this.repository.create(contact)
            const contactCreatedEvent = new ContactCreated({ contact_created: contact.toJSON() }, audit)
            return [contactCreatedEvent, contactReportedEvent]
        }
        await this.repository.update(contact)
        return [contactReportedEvent]
    }
}
