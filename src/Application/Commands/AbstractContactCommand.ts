import Contact from '@src/Domain/Aggregates/Contact/Contact'
import ContactId from '@src/Domain/Aggregates/Contact/ValueObjects/ContactId'
import IContactRepository from '@src/Domain/Aggregates/Contact/IContactRepository'
import AbstractCommand from '../Base/AbstractCommand'
import AbstractContactUseCase from '@src/Domain/Aggregates/Contact/UseCases/AbstractContactUseCase'
import AbstractMapper from '../Base/AbstractMapper'

export default abstract class ContactCommand<
    RequestData,
    UseCaseInput,
    InputMapper extends AbstractMapper<RequestData, UseCaseInput>
> extends AbstractCommand<
    RequestData,
    UseCaseInput,
    InputMapper,
    Contact,
    ContactId,
    IContactRepository,
    AbstractContactUseCase<UseCaseInput>
> {}
