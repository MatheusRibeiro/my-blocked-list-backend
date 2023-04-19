export default class InMemoryQuery {
    protected readonly repositoryNames = {
        Complaint: 'ComplaintInMemoryRepository',
        Contact: 'ContactInMemoryRepository',
        WatchedContact: 'WatchedContactInMemoryRepository',
        UserNotification: 'UserNotificationInMemoryRepository',
    }
}
