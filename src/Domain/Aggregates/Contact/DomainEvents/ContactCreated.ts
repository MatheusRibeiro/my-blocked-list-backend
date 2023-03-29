import ContactDomainEvent from '../Abstractions/ContactDomainEvent'

export default class ContactCreated extends ContactDomainEvent {
    public readonly version = 1
}
