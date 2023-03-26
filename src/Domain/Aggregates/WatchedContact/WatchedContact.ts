import Entity from '../../Base/AbstractEntity'
import UserId from '../User/ValueObjects/UserId'
import ContactAccount from './ValueObjects/ContactAccount'
import WatchedContactId from './ValueObjects/WatchedContactId'

export interface WatchedContactJson {
    id: string
    contact: object
    users: Array<{ id: string }>
}

export default class WatchedContact extends Entity {
    public watchedContactId: WatchedContactId
    public contactAccount: ContactAccount
    public userIds: UserId[]

    constructor(watchedContactId: WatchedContactId, contactAccount: ContactAccount) {
        super()
        this.watchedContactId = watchedContactId
        this.contactAccount = contactAccount
        this.userIds = []
    }

    public getId(): WatchedContactId {
        return this.watchedContactId
    }

    public isValid(): boolean {
        return this.userIds.length > 0
    }

    public isEqual(entity: WatchedContact): boolean {
        return this.watchedContactId.isEqual(entity.watchedContactId)
    }

    public addUser(userId: UserId): void {
        for (const addedUserId of this.userIds) {
            if (addedUserId.isEqual(userId)) return
        }
        this.userIds.push(userId)
    }

    public removeUser(userId: UserId): UserId | null {
        for (let i = 0; i < this.userIds.length; i++) {
            const current = this.userIds[i]
            const shouldBeRemoved = current.isEqual(userId)
            if (shouldBeRemoved) {
                this.userIds.splice(i, 1)
                return current
            }
        }
        return null
    }

    public toJSON(): WatchedContactJson {
        return {
            id: this.watchedContactId.toJSON(),
            contact: this.contactAccount.toJSON(),
            users: this.userIds.map(userId => {
                return { id: userId.toJSON() }
            }),
        }
    }
}
