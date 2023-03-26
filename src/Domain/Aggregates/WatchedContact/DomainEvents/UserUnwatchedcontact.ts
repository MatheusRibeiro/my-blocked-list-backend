import { WatchedContactJson } from '../WatchedContact'
import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'

export interface UserUnwatchedContactPayload {
    watched_contact: WatchedContactJson
    user: { id: string }
}

export default class UserUnwatchedContact extends DomainEvent<UserUnwatchedContactPayload> {
    public readonly version = 1
}
