import DomainEvent from '@src/Domain/Base/Abstractions/DomainEvent'

export default interface IEventHandler<TEvent extends DomainEvent<object> = DomainEvent<object>> {
    handle: (event: TEvent) => Promise<null>
}
