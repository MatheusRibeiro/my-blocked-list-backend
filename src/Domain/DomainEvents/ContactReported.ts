import Complaint from '../Aggregates/Complaint/Complaint'
import Contact from '../Aggregates/Contact/Contact'
import DomainEvent from '../Base/AbstractDomainEvent'

export interface ContactReportedPayload {
    contactReported: Contact
    complaint: Complaint
}

export default class ContactReported extends DomainEvent<ContactReportedPayload> {
    public readonly name = 'ContactReported'
}
