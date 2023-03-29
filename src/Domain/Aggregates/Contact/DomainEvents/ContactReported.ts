import ComplaintDomainEvent from './AbstractComplaintDomainEvent'

export default class ContactReported extends ComplaintDomainEvent {
    public readonly version = 1
}
