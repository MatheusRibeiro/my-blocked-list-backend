import AbstractUseCase from '@src/Domain/Base/AbstractUseCase'
import Contact from '../Contact'
import IContactRepository from '../IContactRepository'
import ContactId from '../ValueObjects/ContactId'

export default abstract class AbstractContactUseCase<DTO> extends AbstractUseCase<
    DTO,
    Contact,
    ContactId,
    IContactRepository
> {}
