export interface WatchedContactViewModel {
    watched_contact_id: string
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
