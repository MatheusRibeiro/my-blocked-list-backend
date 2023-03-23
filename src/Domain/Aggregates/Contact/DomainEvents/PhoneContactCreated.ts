import { ContactJson } from '../Contact'
import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'

export interface PhoneAccountCreatedPayload {
    contact_created: ContactJson
}

export default class PhoneAccountCreated extends DomainEvent<PhoneAccountCreatedPayload> {
    public readonly version = 1
}
