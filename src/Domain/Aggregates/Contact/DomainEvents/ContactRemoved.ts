import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'
import { ContactJson } from '../Contact'

export interface ComplaintRemovedPayload {
    contact: ContactJson
}

export default class ContactRemoved extends DomainEvent<ComplaintRemovedPayload> {
    public readonly version = 1
}
