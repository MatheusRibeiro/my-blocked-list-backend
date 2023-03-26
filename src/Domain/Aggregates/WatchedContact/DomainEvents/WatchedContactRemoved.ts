import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'
import { WatchedContactJson } from '../WatchedContact'

export interface WatchedContactRemovedPayload {
    watched_contact: WatchedContactJson
}

export default class WatchedContactRemoved extends DomainEvent<WatchedContactRemovedPayload> {
    public readonly version = 1
}
