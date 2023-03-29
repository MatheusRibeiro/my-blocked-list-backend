import { WatchedContactDomainEvent } from './AbstractWatchedContactDomainEvent'

export default class WatchedContactRemoved extends WatchedContactDomainEvent {
    public readonly version = 1
}
