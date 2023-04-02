import WatchedContact from '@src/Domain/Aggregates/WatchedContact/WatchedContact'
import WatchedContactId from '@src/Domain/Aggregates/WatchedContact/ValueObjects/WatchedContactId'
import IWatchedContactRepository from '@src/Domain/Aggregates/WatchedContact/IWatchedContactRepository'
import AbstractCommand from '../Base/AbstractCommand'
import WatchedContactUseCase from '@src/Domain/Aggregates/WatchedContact/Abstractions/WatchedContactUseCase'
import WatchedContactEventDispatcher from './Events/WatchedContactEventsDispatcher'

export default abstract class WatchedContactCommand<RequestData, UseCaseInput> extends AbstractCommand<
    RequestData,
    UseCaseInput,
    WatchedContact,
    WatchedContactId,
    IWatchedContactRepository,
    WatchedContactUseCase<UseCaseInput>,
    WatchedContactEventDispatcher
> {}
