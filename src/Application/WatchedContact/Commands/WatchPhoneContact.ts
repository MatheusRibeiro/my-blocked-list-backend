import { container } from 'tsyringe'
import WatchPhoneContactUseCase, {
    WatchPhoneContactDTO,
} from '@src/Domain/Aggregates/WatchedContact/UseCases/WatchPhoneContact'
import WatchedContactCommand from '../AbstractWatchedContactCommand'
import { assertIsPhone } from '@src/Domain/Base/Types/Phone'
import WatchedContactEventDispatcher from '../Events/WatchedContactEventsDispatcher'

interface WatchPhoneContactRequestData {
    phone: string
}

function mapper(input: WatchPhoneContactRequestData): WatchPhoneContactDTO {
    assertIsPhone(input.phone)
    return {
        phone: input.phone,
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
