import { container } from 'tsyringe'
import WatchedContactCommand from '../AbstractWatchedContactCommand'
import UnwatchContactUseCase, { UnwatchContactDTO } from '@src/Domain/Aggregates/WatchedContact/UseCases/UnwatchContact'
import UUID from '@src/Domain/Base/ValueObject/UUID'

interface UnwatchContactRequestData {
    watchedContactId: string
}

function mapper(input: UnwatchContactRequestData): UnwatchContactDTO {
    return {
        watchedContactId: new UUID(input.watchedContactId),
    }
}

export default class UnwatchContactCommand extends WatchedContactCommand<UnwatchContactRequestData, UnwatchContactDTO> {
    constructor() {
        super(container.resolve(UnwatchContactUseCase), mapper)
    }
}
