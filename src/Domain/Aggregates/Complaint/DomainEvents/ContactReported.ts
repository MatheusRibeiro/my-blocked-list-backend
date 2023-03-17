import { ComplaintJson } from '../Complaint'
import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'
import { ContactJson } from '../../Contact/Contact'

export interface ContactReportedPayload {
    complaint: ComplaintJson
    contact_reported: ContactJson
}

export default class ContactReported extends DomainEvent<ContactReportedPayload> {
    public readonly name = 'ContactReported'
    public readonly version = 1
}
