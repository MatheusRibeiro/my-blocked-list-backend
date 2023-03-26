import { WatchedContactJson } from '../WatchedContact'
import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'

export interface WatchedContactCreatedPayload {
    watched_contact: WatchedContactJson
}

export default class WatchedContactCreated extends DomainEvent<WatchedContactCreatedPayload> {
    public readonly version = 1
}
