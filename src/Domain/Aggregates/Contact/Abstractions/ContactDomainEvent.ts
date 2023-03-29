import DomainEvent from '@src/Domain/Base/Abstractions/DomainEvent'
import Audit from '@src/Domain/Base/Audit'
import { ContactJson } from '../Contact'

export interface ContactDomainEventPayload {
    contact: ContactJson
}

export default abstract class ContactDomainEvent extends DomainEvent {
    public readonly contact: ContactJson

    constructor(contact: ContactJson, audit: Audit) {
        super(audit)
        this.contact = contact
    }

    public getPayload(): ContactDomainEventPayload {
        return { contact: this.contact }
    }
}
