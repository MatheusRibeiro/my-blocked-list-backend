import DomainEvent from '@src/Domain/Base/Abstractions/DomainEvent'
import IEventDispatcher from './IEventDispatcher'
import IEventHandler from './IEventHandler'

export default class EventDispatcher implements IEventDispatcher {
    protected eventHandlers: { [eventName: string]: IEventHandler[] } = {}

    getEventHandlers(): { [eventName: string]: IEventHandler[] } {
        return this.eventHandlers
    }

    register = (eventName: string, handler: IEventHandler): void => {
        if (this.eventHandlers[eventName] === undefined) {
            this.eventHandlers[eventName] = []
        }
        this.eventHandlers[eventName].push(handler)
    }

    notify = async (event: DomainEvent): Promise<void> => {
        const eventName = event.constructor.name
        if (this.getEventHandlers()[eventName] !== undefined) {
            const promises = this.eventHandlers[eventName].map(async handler => await handler.handle(event))
            await Promise.all(promises)
        }
    }
}
