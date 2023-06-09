import DomainEvent from '@src/Domain/Base/Abstractions/DomainEvent'
import IEventHandler from './IEventHandler'

export default interface IEventDispatcher {
    register: (eventName: string, handler: IEventHandler<DomainEvent<object>>) => void
    notify: (event: DomainEvent<object>) => void
}
