import { injectable, inject } from 'tsyringe'
import IContactRepository from '../IContactRepository'
import UseCase from '../../../Base/AbstractUseCase'
import DomainEvent from '../../../Base/AbstractDomainEvent'
import Audit from '../../../Base/Audit'
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
