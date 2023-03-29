import Audit from '@src/Domain/Base/Audit'
import { ComplaintJson } from '../Complaint/Complaint'
import { ContactJson } from '../Contact'
import ContactDomainEvent, { ContactDomainEventPayload } from './AbstractContactDomainEvent'

export interface ComplaintDomainEventPayload extends ContactDomainEventPayload {
    complaint: ComplaintJson
}

export default abstract class ComplaintDomainEvent extends ContactDomainEvent {
    public readonly complaint: ComplaintJson

    constructor(complaint: ComplaintJson, contact: ContactJson, audit: Audit) {
        super(contact, audit)
        this.complaint = complaint
    }

    public getPayload(): ComplaintDomainEventPayload {
        return {
            complaint: this.complaint,
            contact: this.contact,
        }
    }
}
