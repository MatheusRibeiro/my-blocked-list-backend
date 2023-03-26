import WatchedContact from '@src/Domain/Aggregates/WatchedContact/WatchedContact'
import WatchedContactId from '@src/Domain/Aggregates/WatchedContact/ValueObjects/WatchedContactId'
import IWatchedContactRepository from '@src/Domain/Aggregates/WatchedContact/IWatchedContactRepository'
import AbstractCommand from '../Base/AbstractCommand'
import AbstractWatchedContactUseCase from '@src/Domain/Aggregates/WatchedContact/UseCases/AbstractWatchedContactUseCase'
import AbstractMapper from '../Base/AbstractMapper'

export default abstract class WatchedContactCommand<RequestData, UseCaseInput> extends AbstractCommand<
    RequestData,
    UseCaseInput,
    AbstractMapper<RequestData, UseCaseInput>,
    WatchedContact,
    WatchedContactId,
    IWatchedContactRepository,
    AbstractWatchedContactUseCase<UseCaseInput>
> {}
