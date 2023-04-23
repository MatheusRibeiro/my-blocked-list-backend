import { container } from 'tsyringe'
import WatchPhoneContactUseCase, {
    WatchPhoneContactDTO,
} from '@src/Domain/Aggregates/WatchedContact/UseCases/WatchPhoneContact'
import WatchedContactCommand from '../AbstractWatchedContactCommand'
import Phone from '@src/Domain/Base/ValueObject/Phone'
import WatchedContactEventDispatcher from '../Events/WatchedContactEventsDispatcher'

interface WatchPhoneContactRequestData {
    phone: string
}

function mapper(input: WatchPhoneContactRequestData): WatchPhoneContactDTO {
    const phone = new Phone(input.phone)
    return {
        phone,
    }
}

export default class WatchPhoneContactCommand extends WatchedContactCommand<
    WatchPhoneContactRequestData,
    WatchPhoneContactDTO
> {
    constructor() {
        super(container.resolve(WatchPhoneContactUseCase), mapper, container.resolve(WatchedContactEventDispatcher))
    }
}
