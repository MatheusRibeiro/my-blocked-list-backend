import { container } from 'tsyringe'
import WatchedContactCommand from '../AbstractWatchedContactCommand'
import Email from '@src/Domain/Base/ValueObject/Email'
import WatchEmailContactUseCase, {
    WatchEmailContactDTO,
} from '@src/Domain/Aggregates/WatchedContact/UseCases/WatchEmailContact'

interface WatchEmailContactRequestData {
    email: string
}

function mapper(input: WatchEmailContactRequestData): WatchEmailContactDTO {
    return {
        email: new Email(input.email),
    }
}

export default class WatchEmailContactCommand extends WatchedContactCommand<
    WatchEmailContactRequestData,
    WatchEmailContactDTO
> {
    constructor() {
        super(container.resolve(WatchEmailContactUseCase), mapper)
    }
}
