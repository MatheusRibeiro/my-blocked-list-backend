import ComplaintDomainEvent from '../Abstractions/ComplaintDomainEvent'

export default class ContactReported extends ComplaintDomainEvent {
    public readonly version = 1
}
