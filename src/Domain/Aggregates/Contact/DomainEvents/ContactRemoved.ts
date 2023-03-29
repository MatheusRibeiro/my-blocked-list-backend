import ContactDomainEvent from '../Abstractions/ContactDomainEvent'

export default class ContactRemoved extends ContactDomainEvent {
    public readonly version = 1
}
