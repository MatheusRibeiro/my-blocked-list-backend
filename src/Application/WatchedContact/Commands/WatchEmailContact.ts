import { container } from 'tsyringe'
import WatchedContactCommand from '../AbstractWatchedContactCommand'
import { assertIsEmail } from '@src/Domain/Base/Types/Email'
import WatchEmailContactUseCase, {
    WatchEmailContactDTO,
} from '@src/Domain/Aggregates/WatchedContact/UseCases/WatchEmailContact'
import WatchedContactEventDispatcher from '../Events/WatchedContactEventsDispatcher'

interface WatchEmailContactRequestData {
    email: string
}

function mapper(input: WatchEmailContactRequestData): WatchEmailContactDTO {
    assertIsEmail(input.email)
    return {
        email: input.email,
    }
}

export default class WatchEmailContactCommand extends WatchedContactCommand<
    WatchEmailContactRequestData,
    WatchEmailContactDTO
> {
    constructor() {
        super(container.resolve(WatchEmailContactUseCase), mapper, container.resolve(WatchedContactEventDispatcher))
    }
}
