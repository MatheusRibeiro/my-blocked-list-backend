import ComplaintDomainEvent from '../Abstractions/ComplaintDomainEvent'

export default class ComplaintRemoved extends ComplaintDomainEvent {
    public readonly version = 1
}
