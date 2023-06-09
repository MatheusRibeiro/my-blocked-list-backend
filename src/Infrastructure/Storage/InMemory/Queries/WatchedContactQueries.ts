import IWatchedContactQueries, {
    WatchedContactViewModel,
    GetWatchedAccountsQuery,
} from '@src/Application/WatchedContact/Queries/IWatchedContactQueries'
import WatchedContact from '@src/Domain/Aggregates/WatchedContact/WatchedContact'
import InMemoryQuery from '../Base/InMemoryQuery'
import dbContext from '../Base/DbContext'
import UUID from '@src/Domain/Base/ValueObject/UUID'

export default class WatchedContactInMemoryQueries extends InMemoryQuery implements IWatchedContactQueries {
    async getWatchedAccounts({ userId }: GetWatchedAccountsQuery): Promise<WatchedContactViewModel[]> {
        const accounts = this.getWatchedContactAccountsByUser(userId)
        return accounts.map(this.toViewModel)
    }

    async getWatchedPhones({ userId }: GetWatchedAccountsQuery): Promise<WatchedContactViewModel[]> {
        const accounts = this.getWatchedContactAccountsByUser(userId)
        return accounts.filter(this.filterByPhoneAccountType).map(this.toViewModel)
    }

    async getWatchedEmails({ userId }: GetWatchedAccountsQuery): Promise<WatchedContactViewModel[]> {
        const accounts = this.getWatchedContactAccountsByUser(userId)
        return accounts.filter(this.filterByEmailAccountType).map(this.toViewModel)
    }

    private getWatchedContactAccountsByUser(userId: string): WatchedContact[] {
        const uuid = new UUID(userId)
        if (!uuid.isValid()) {
            return []
        }
        const repositoryName = this.repositoryNames.WatchedContact
        const accountsBeenWatchedByUser: WatchedContact[] = []
        for (let i = 0; i < dbContext[repositoryName].length; i++) {
            const watching = (dbContext[repositoryName][i] as WatchedContact).userIds
            for (let j = 0; j < watching.length; j++) {
                if (watching[j].isEqual(uuid)) {
                    accountsBeenWatchedByUser.push(dbContext[repositoryName][i] as WatchedContact)
                }
            }
        }
        return accountsBeenWatchedByUser
    }

    private filterByPhoneAccountType(watchedContact: WatchedContact): boolean {
        return watchedContact.contactAccount.constructor.name === 'PhoneAccount'
    }

    private filterByEmailAccountType(watchedContact: WatchedContact): boolean {
        return watchedContact.contactAccount.constructor.name === 'EmailAccount'
    }

    private toViewModel(watchedContact: WatchedContact): WatchedContactViewModel {
        return {
            watched_contact_id: watchedContact.watchedContactId,
            contact: watchedContact.contactAccount.toJSON(),
        }
    }
}
