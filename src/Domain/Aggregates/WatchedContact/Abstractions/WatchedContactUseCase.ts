import AbstractUseCase from '@src/Domain/Base/AbstractUseCase'
import WatchedContact from '../WatchedContact'
import IWatchedContactRepository from '../IWatchedContactRepository'
import WatchedContactId from '../ValueObjects/WatchedContactId'

export default abstract class AbstractWatchedContactUseCase<DTO> extends AbstractUseCase<
    DTO,
    WatchedContact,
    WatchedContactId,
    IWatchedContactRepository
> {}
