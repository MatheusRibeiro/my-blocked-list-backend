import { WatchedContactDomainEvent } from '../Abstractions/WatchedContactDomainEvent'

export default class WatchedContactRemoved extends WatchedContactDomainEvent {
    public readonly version = 1
}
