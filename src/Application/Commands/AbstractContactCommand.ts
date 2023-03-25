import Contact from '@src/Domain/Aggregates/Contact/Contact'
import ContactId from '@src/Domain/Aggregates/Contact/ValueObjects/ContactId'
import IContactRepository from '@src/Domain/Aggregates/Contact/IContactRepository'
import AbstractCommand from '../Base/AbstractCommand'
import AbstractContactUseCase from '@src/Domain/Aggregates/Contact/UseCases/AbstractContactUseCase'

export default abstract class ContactCommand<DTO> extends AbstractCommand<
    DTO,
    Contact,
    ContactId,
    IContactRepository,
    AbstractContactUseCase<DTO>
> {}
