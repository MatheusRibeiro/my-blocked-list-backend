import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'
import Audit from '@src/Domain/Base/Audit'
import { WatchedContactJson } from '../WatchedContact'

export interface WatchedContactDomainEventPayload {
    watched_contact: WatchedContactJson
}

export abstract class WatchedContactDomainEvent extends DomainEvent {
    public readonly watchedContact: WatchedContactJson

    constructor(watchedContact: WatchedContactJson, audit: Audit) {
        super(audit)
        this.watchedContact = watchedContact
    }

    public getPayload(): WatchedContactDomainEventPayload {
        return { watched_contact: this.watchedContact }
    }
}
