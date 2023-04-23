import UUID from '@src/Domain/Base/ValueObject/UUID'

export interface WatchedContactViewModel {
    watched_contact_id: UUID
    contact: object
}
export interface GetWatchedAccountsQuery {
    userId: string
}

export default interface IComplaintQueries {
    getWatchedAccounts: (params: GetWatchedAccountsQuery) => Promise<WatchedContactViewModel[]>
    getWatchedPhones: (params: GetWatchedAccountsQuery) => Promise<WatchedContactViewModel[]>
    getWatchedEmails: (params: GetWatchedAccountsQuery) => Promise<WatchedContactViewModel[]>
}
