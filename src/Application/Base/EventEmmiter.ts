import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'

export default async function eventEmmiter(events: Array<DomainEvent<object>>): Promise<null> {
    events.map(event => console.log(JSON.stringify(event, null, 2)))
    return null
}
