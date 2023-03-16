import Complaint from '../Complaint'
import Contact from '../../Contact/Contact'
import DomainEvent from '../../../Base/AbstractDomainEvent'

export interface ContactReportedPayload {
    contactReported: Contact
    complaint: Complaint
}

export default class ContactReported extends DomainEvent<ContactReportedPayload> {
    public readonly name = 'ContactReported'
}
