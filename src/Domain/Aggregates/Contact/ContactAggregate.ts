import AggregateRoot from '@src/Domain/Base/AbstractAggregateRoot'
import Audit from '@src/Domain/Base/Audit'
import Email from '@src/Domain/Base/ValueObject/Email'
import Phone from '@src/Domain/Base/ValueObject/Phone'
import NotFoundError from '@src/Domain/Errors/NotFoundError'
import UserId from '../User/ValueObjects/UserId'
import { complaintFactoryWithoutId } from './Complaint/ComplaintFactory'
import ComplaintId from './Complaint/ValueObjects/ComplaintId'
import { ComplaintCategory, ComplaintSeverity } from './Complaint/ValueObjects/ComplaintType'
import Contact from './Contact'
import { contactFactoryWithoutId } from './ContactFactory'
import ComplaintRemoved from './DomainEvents/ComplaintRemoved'
import ContactCreated from './DomainEvents/ContactCreated'
import ContactRemoved from './DomainEvents/ContactRemoved'
import ContactReported from './DomainEvents/ContactReported'
import IContactRepository from './IContactRepository'
import ContactId from './ValueObjects/ContactId'

interface CreateContactBaseParams {
    firstName: string
    lastName: string
}
export interface CreatePhoneContactParams extends CreateContactBaseParams {
    phone: string
}
export interface CreateEmailContactParams extends CreateContactBaseParams {
    email: string
}

export interface AddComplaintParams {
    description: string
    complaintCategory: ComplaintCategory
    complaintSeverity: ComplaintSeverity
    userId: string
}
export interface RemoveComplaintParams {
    complaintId: ComplaintId
    userId: UserId
}

type CreateComplaintEvents = ContactCreated | ContactReported
type RemoveComplaintEvents = ComplaintRemoved | ContactRemoved

export default class ContactAggregate extends AggregateRoot<Contact, ContactId, IContactRepository> {
    static async factoryById(rootId: ContactId, repository: IContactRepository): Promise<ContactAggregate> {
        const rootFound = await repository.findById(rootId)
        if (rootFound === null) {
            throw new NotFoundError('Contact was not found.')
        }
        return new ContactAggregate(rootFound, repository)
    }

    static async factoryByPhone(
        params: CreatePhoneContactParams,
        repository: IContactRepository
    ): Promise<ContactAggregate> {
        const phone = new Phone(params.phone)
        const contactFound = await repository.findByPhone(phone)
        if (contactFound === null) {
            const contact = contactFactoryWithoutId(params)
            return new ContactAggregate(contact, repository)
        }
        return new ContactAggregate(contactFound, repository)
    }

    static async factoryByEmail(
        params: CreateEmailContactParams,
        repository: IContactRepository
    ): Promise<ContactAggregate> {
        const email = new Email(params.email)
        const contactFound = await repository.findByEmail(email)
        if (contactFound === null) {
            const contact = contactFactoryWithoutId(params)
            return new ContactAggregate(contact, repository)
        }
        return new ContactAggregate(contactFound, repository)
    }

    public async createComplaint(
        { description, complaintCategory, complaintSeverity, userId }: AddComplaintParams,
        audit: Audit
    ): Promise<CreateComplaintEvents[]> {
        const complaint = complaintFactoryWithoutId({
            description,
            category: complaintCategory,
            severity: complaintSeverity,
            authorId: userId,
        })
        const existingContact = await this.repository.findById(this.rootEntity.getId())
        const isANewContact = existingContact === null

        this.rootEntity.addComplaint(complaint)
        const contactReportedEvent = new ContactReported(
            { contact_reported: this.rootEntity.toJSON(), complaint: complaint.toJSON() },
            audit
        )

        if (isANewContact) {
            await this.repository.create(this.rootEntity)
            const contactCreatedEvent = new ContactCreated({ contact_created: this.rootEntity.toJSON() }, audit)
            return [contactCreatedEvent, contactReportedEvent]
        }
        await this.repository.update(this.rootEntity)
        return [contactReportedEvent]
    }

    public async removeComplaint(
        { complaintId, userId }: RemoveComplaintParams,
        audit: Audit
    ): Promise<RemoveComplaintEvents[]> {
        const events: RemoveComplaintEvents[] = []
        const complaintRemoved = this.rootEntity.removeComplaint(complaintId, userId)
        if (complaintRemoved === null) {
            throw new NotFoundError('Complaint was not found')
        }
        events.push(new ComplaintRemoved({ complaint: complaintRemoved.toJSON() }, audit))

        if (this.rootEntity.complaints.length === 0) {
            await this.repository.delete(this.rootEntity)
            events.push(new ContactRemoved({ contact: this.rootEntity.toJSON() }, audit))
        } else {
            await this.repository.update(this.rootEntity)
        }
        return events
    }
}
