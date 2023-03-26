import { container } from 'tsyringe'
import WatchPhoneContactUseCase, {
    WatchPhoneContactDTO,
} from '@src/Domain/Aggregates/WatchedContact/UseCases/WatchPhoneContact'
import WatchedContactCommand from '../AbstractWatchedContactCommand'
import Phone from '@src/Domain/Base/ValueObject/Phone'

interface WatchPhoneContactRequestData {
    phone: string
}

function mapper(input: WatchPhoneContactRequestData): WatchPhoneContactDTO {
    return {
        phone: new Phone(input.phone),
    }
}

export default class WatchPhoneWatchedContactCommand extends WatchedContactCommand<
    WatchPhoneContactRequestData,
    WatchPhoneContactDTO
> {
    constructor() {
        super(container.resolve(WatchPhoneContactUseCase), mapper)
    }
}
