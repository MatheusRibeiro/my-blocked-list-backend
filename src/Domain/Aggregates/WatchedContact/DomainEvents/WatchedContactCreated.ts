import { WatchedContactDomainEvent } from '../Abstractions/WatchedContactDomainEvent'

export default class WatchedContactCreated extends WatchedContactDomainEvent {
    public readonly version = 1
}
