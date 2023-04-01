import { inject, injectable } from 'tsyringe'
import Audit from '@src/Domain/Base/Audit'
import Email from '@src/Domain/Base/Types/Email'
import { complaintFactoryWithoutId } from '../Complaint/ComplaintFactory'
import { contactFactoryWithoutId } from '../ContactFactory'
import ContactCreated from '../DomainEvents/ContactCreated'
import ContactReported from '../DomainEvents/ContactReported'
import AbstractContactUseCase from '../Abstractions/ContactUseCase'
import IContactRepository from '../IContactRepository'
import PersonName from '@src/Domain/Base/ValueObject/PersonName'
import UUID from '@src/Domain/Base/Types/UUID'

export interface CreateEmailComplaintDTO {
    personName: PersonName
    description: string
    complaintCategory: string
    complaintSeverity: string
    email: Email
    authorId: UUID
}

type CreateComplaintEvents = ContactCreated | ContactReported

@injectable()
export default class CreateEmailComplaintUseCase extends AbstractContactUseCase<CreateEmailComplaintDTO> {
    constructor(@inject('ContactRepository') contactRepository: IContactRepository) {
        super(contactRepository)
    }

    public async execute(dto: CreateEmailComplaintDTO, audit: Audit): Promise<CreateComplaintEvents[]> {
        const { personName, description, complaintCategory, complaintSeverity, email, authorId } = dto
        const events: CreateComplaintEvents[] = []
        const complaint = complaintFactoryWithoutId({
            description,
            category: complaintCategory,
            severity: complaintSeverity,
            authorId,
        })
        const existingContact = await this.repository.findByEmail(email)
        const isANewContact = existingContact === null

        const contact = isANewContact ? contactFactoryWithoutId({ email, personName }) : existingContact
        if (isANewContact) events.push(new ContactCreated(contact.toJSON(), audit))

        contact.addComplaint(complaint)
        events.push(new ContactReported(complaint.toJSON(), contact.toJSON(), audit))

        isANewContact ? await this.repository.create(contact) : await this.repository.update(contact)
        return events
    }
}
