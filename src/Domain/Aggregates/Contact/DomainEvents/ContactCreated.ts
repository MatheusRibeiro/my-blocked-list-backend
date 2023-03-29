import ContactDomainEvent from './AbstractContactDomainEvent'

export default class ContactCreated extends ContactDomainEvent {
    public readonly version = 1
}
