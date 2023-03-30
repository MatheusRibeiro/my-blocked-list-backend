import { container } from 'tsyringe'
import Contact from '@src/Domain/Aggregates/Contact/Contact'
import ContactId from '@src/Domain/Aggregates/Contact/ValueObjects/ContactId'
import IContactRepository from '@src/Domain/Aggregates/Contact/IContactRepository'
import AbstractCommand from '../Base/AbstractCommand'
import ContactUseCase from '@src/Domain/Aggregates/Contact/Abstractions/ContactUseCase'
import ContactEventsDispatcher from './Events/ContactEventsDispatcher'

export default abstract class ContactCommand<RequestData, UseCaseInput> extends AbstractCommand<
    RequestData,
    UseCaseInput,
    Contact,
    ContactId,
    IContactRepository,
    ContactUseCase<UseCaseInput>
> {
    protected readonly eventDispatcher = container.resolve(ContactEventsDispatcher)
}
