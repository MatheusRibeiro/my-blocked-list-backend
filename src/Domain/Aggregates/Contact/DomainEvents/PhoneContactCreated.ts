import Contact from '../Contact'
import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'

export interface PhoneAccountCreatedPayload {
    contactCreated: Contact
}

export default class PhoneAccountCreated extends DomainEvent<PhoneAccountCreatedPayload> {
    public readonly name = 'PhoneAccountCreated'
}
