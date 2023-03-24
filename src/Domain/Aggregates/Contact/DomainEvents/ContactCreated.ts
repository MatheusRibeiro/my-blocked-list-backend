import { ContactJson } from '../Contact'
import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'

export interface ContactCreatedPayload {
    contact_created: ContactJson
}

export default class ContactCreated extends DomainEvent<ContactCreatedPayload> {
    public readonly version = 1
}
