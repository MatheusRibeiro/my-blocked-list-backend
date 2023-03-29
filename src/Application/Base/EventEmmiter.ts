import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'

export default async function eventEmmiter(events: DomainEvent[]): Promise<null> {
    events.map(event => console.log(event.constructor.name))
    return null
}
