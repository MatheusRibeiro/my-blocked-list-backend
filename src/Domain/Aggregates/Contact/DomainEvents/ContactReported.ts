import { ComplaintJson } from '../Complaint/Complaint'
import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'
import { ContactJson } from '../Contact'

export interface ContactReportedPayload {
    complaint: ComplaintJson
    contact_reported: ContactJson
}

export default class ContactReported extends DomainEvent<ContactReportedPayload> {
    public readonly version = 1
}
