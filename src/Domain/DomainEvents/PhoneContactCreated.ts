import Contact from '../Aggregates/Contact/Contact'
import DomainEvent from '../Base/AbstractDomainEvent'

export interface PhoneAccountCreatedPayload {
    contactCreated: Contact
}

export default class PhoneAccountCreated extends DomainEvent<PhoneAccountCreatedPayload> {
    public readonly name = 'PhoneAccountCreated'
}
