import { WatchedContactJson } from '../WatchedContact'
import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'

export interface UserWatchedContactPayload {
    watched_contact: WatchedContactJson
    user: { id: string }
}

export default class UserWatchedContact extends DomainEvent<UserWatchedContactPayload> {
    public readonly version = 1
}
