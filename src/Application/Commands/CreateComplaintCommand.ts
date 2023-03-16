import { injectable, inject, container } from 'tsyringe'
import IContactRepository from '@src/Domain/Aggregates/Contact/IContactRepository'
import PhoneAccount from '@src/Domain/Base/ValueObject/Phone'
import Contact from '@src/Domain/Aggregates/Contact/Contact'
import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'
import CreatePhoneContact from '@src/Domain/UseCases/CreatePhoneContact'
import ReportContact from '@src/Domain/UseCases/ReportContact'
import Audit from '@src/Domain/Base/Audit'
import UserId from '@src/Domain/Aggregates/User/ValueObjects/UserId'
import NotFoundError from '@src/Domain/Errors/NotFoundError'

interface CreateComplaintRequest {
    firstName: string
    lastName: string
    description: string
    complaintCategory: number
    complaintSeverity: number
    phone: string
}
@injectable()
export default class CreateComplaintCommand {
    private readonly contactRepository: IContactRepository

    constructor(@inject('ContactRepository') contactRepository: IContactRepository) {
        this.contactRepository = contactRepository
    }

    public execute = async (
        { firstName, lastName, description, complaintCategory, complaintSeverity, phone }: CreateComplaintRequest,
        authorId: string
    ): Promise<null> => {
        const domainEvents: Array<DomainEvent<object>> = []
        const audit = new Audit(new UserId(authorId))

        const existingContact = await this.contactRepository.findByPhone(new PhoneAccount(phone))

        let contact: Contact
        if (existingContact === null) {
            const contactInfo = { firstName, lastName, phone }
            const createContactUseCase = container.resolve(CreatePhoneContact)
            const createContactEvents = await createContactUseCase.execute(contactInfo, audit)
            domainEvents.push(...createContactEvents)

            const result = await this.contactRepository.findByPhone(new PhoneAccount(phone))
            if (result === null) throw new NotFoundError('Unable to find contact')
            contact = result
        } else {
            contact = existingContact
        }

        const reportContactUseCase = container.resolve(ReportContact)
        const reportContactEvents = await reportContactUseCase.execute(
            { contact, description, complaintCategory, complaintSeverity },
            audit
        )
        domainEvents.push(...reportContactEvents)

        return null
    }
}
