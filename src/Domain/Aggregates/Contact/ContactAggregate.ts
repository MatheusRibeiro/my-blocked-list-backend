import AggregateRoot from '@src/Domain/Base/AbstractAggregateRoot'
import Audit from '@src/Domain/Base/Audit'
import NotFoundError from '@src/Domain/Errors/NotFoundError'
import UserId from '../User/ValueObjects/UserId'
import ComplaintId from './Complaint/ValueObjects/ComplaintId'
import Contact from './Contact'
import ComplaintRemoved from './DomainEvents/ComplaintRemoved'
import ContactRemoved from './DomainEvents/ContactRemoved'
import IContactRepository from './IContactRepository'
import ContactId from './ValueObjects/ContactId'

export interface RemoveComplaintParams {
    complaintId: ComplaintId
    userId: UserId
}

type RemoveComplaintEvents = ComplaintRemoved | ContactRemoved

export default class ContactAggregate extends AggregateRoot<Contact, ContactId, IContactRepository> {
    static async factoryById(rootId: ContactId, repository: IContactRepository): Promise<ContactAggregate> {
        const rootFound = await repository.findById(rootId)
        if (rootFound === null) {
            throw new NotFoundError('Contact was not found.')
        }
        return new ContactAggregate(rootFound, repository)
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
