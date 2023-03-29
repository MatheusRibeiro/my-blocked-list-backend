import ContactDomainEvent from './AbstractContactDomainEvent'

export default class ContactRemoved extends ContactDomainEvent {
    public readonly version = 1
}
