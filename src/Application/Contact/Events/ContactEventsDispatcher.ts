import { container, singleton } from 'tsyringe'
import EventDispatcher from '@src/Application/Base/EventDispatcher/EventDispatcher'
import ContactReportedEventHandler from '@src/Application/WatchedContact/Events/ContactReportedEventHandler'

@singleton()
export default class ContactEventDispatcher extends EventDispatcher {
    constructor() {
        super()
        const contactReportedHandlerForWatchedContacts = container.resolve(ContactReportedEventHandler)
        this.register('ContactReported', contactReportedHandlerForWatchedContacts)
    }
}
