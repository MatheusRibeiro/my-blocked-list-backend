import { container } from 'tsyringe'
import WatchedContactCommand from '../AbstractWatchedContactCommand'
import UnwatchContactUseCase, { UnwatchContactDTO } from '@src/Domain/Aggregates/WatchedContact/UseCases/UnwatchContact'
import { assertIsUUID } from '@src/Domain/Base/Types/UUID'
import WatchedContactEventDispatcher from '../Events/WatchedContactEventsDispatcher'

interface UnwatchContactRequestData {
    watchedContactId: string
}

function mapper(input: UnwatchContactRequestData): UnwatchContactDTO {
    assertIsUUID(input.watchedContactId)

    return {
        watchedContactId: input.watchedContactId,
    }
}

export default class UnwatchContactCommand extends WatchedContactCommand<UnwatchContactRequestData, UnwatchContactDTO> {
    constructor() {
        super(container.resolve(UnwatchContactUseCase), mapper, container.resolve(WatchedContactEventDispatcher))
    }
}
