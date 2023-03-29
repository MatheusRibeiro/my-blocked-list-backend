import Audit from '@src/Domain/Base/Audit'
import { WatchedContactJson } from '../WatchedContact'
import { WatchedContactDomainEvent, WatchedContactDomainEventPayload } from './AbstractWatchedContactDomainEvent'

export interface UserWatchedContactDomainEventPayload extends WatchedContactDomainEventPayload {
    user: { id: string }
}

export default abstract class UserWatchedContactDomainEvent extends WatchedContactDomainEvent {
    public readonly userId: string

    constructor(userId: string, watchedContact: WatchedContactJson, audit: Audit) {
        super(watchedContact, audit)
        this.userId = userId
    }

    public getPayload(): UserWatchedContactDomainEventPayload {
        return {
            user: { id: this.userId },
            watched_contact: this.watchedContact,
        }
    }
}
