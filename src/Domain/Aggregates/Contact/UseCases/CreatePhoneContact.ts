import { injectable, inject } from 'tsyringe'
import UseCase from '@src/Domain/Base/AbstractUseCase'
import Audit from '@src/Domain/Base/Audit'
import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'
import IContactRepository from '../IContactRepository'
import { contactFactoryWithoutId } from '../ContactFactory'
import PhoneAccountCreated from '../DomainEvents/PhoneContactCreated'

export interface CreatePhoneContactDTO {
    firstName: string
    lastName: string
    phone: string
}

@injectable()
export default class CreatePhoneContact extends UseCase<CreatePhoneContactDTO> {
    private readonly contactRepository: IContactRepository

    constructor(@inject('ContactRepository') contactRepository: IContactRepository) {
        super()
        this.contactRepository = contactRepository
    }

    public execute = async (
        { firstName, lastName, phone }: CreatePhoneContactDTO,
        audit: Audit
    ): Promise<Array<DomainEvent<object>>> => {
        const events: Array<DomainEvent<object>> = []

        const contact = contactFactoryWithoutId({
            firstName,
            lastName,
            phone,
        })
        contact.validate()
        await this.contactRepository.create(contact)

        events.push(new PhoneAccountCreated({ contactCreated: contact }, audit))
        return events
    }
}
