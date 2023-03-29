import AbstractUseCase from '@src/Domain/Base/Abstractions/UseCase'
import Contact from '../Contact'
import IContactRepository from '../IContactRepository'
import ContactId from '../ValueObjects/ContactId'

export default abstract class ContactUseCase<DTO> extends AbstractUseCase<
    DTO,
    Contact,
    ContactId,
    IContactRepository
> {}
