import { WatchedContactDomainEvent } from './AbstractWatchedContactDomainEvent'

export default class WatchedContactCreated extends WatchedContactDomainEvent {
    public readonly version = 1
}
