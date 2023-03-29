import AbstractUseCase from '@src/Domain/Base/Abstractions/UseCase'
import WatchedContact from '../WatchedContact'
import IWatchedContactRepository from '../IWatchedContactRepository'
import WatchedContactId from '../ValueObjects/WatchedContactId'

export default abstract class WatchedContactUseCase<DTO> extends AbstractUseCase<
    DTO,
    WatchedContact,
    WatchedContactId,
    IWatchedContactRepository
> {}
