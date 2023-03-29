import ComplaintDomainEvent from './AbstractComplaintDomainEvent'

export default class ComplaintRemoved extends ComplaintDomainEvent {
    public readonly version = 1
}
