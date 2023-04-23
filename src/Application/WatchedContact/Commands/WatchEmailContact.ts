import { container } from 'tsyringe'
import WatchedContactCommand from '../AbstractWatchedContactCommand'
import Email from '@src/Domain/Base/ValueObject/Email'
import WatchEmailContactUseCase, {
    WatchEmailContactDTO,
} from '@src/Domain/Aggregates/WatchedContact/UseCases/WatchEmailContact'
import WatchedContactEventDispatcher from '../Events/WatchedContactEventsDispatcher'

interface WatchEmailContactRequestData {
    email: string
}

function mapper(input: WatchEmailContactRequestData): WatchEmailContactDTO {
    const email = new Email(input.email)
    return {
        email,
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
