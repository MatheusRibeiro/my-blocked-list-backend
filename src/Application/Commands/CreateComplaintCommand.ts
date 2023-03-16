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

interface ContactInfo {
    firstName: string
    lastName: string
    phone: string
}
@injectable()
export default class CreateComplaintCommand {
    private readonly contactRepository: IContactRepository
    private readonly domainEvents: Array<DomainEvent<object>> = []

    constructor(@inject('ContactRepository') contactRepository: IContactRepository) {
        this.contactRepository = contactRepository
    }

    public execute = async (
        { firstName, lastName, description, complaintCategory, complaintSeverity, phone }: CreateComplaintRequest,
        authorId: string
    ): Promise<null> => {
        const audit = new Audit(new UserId(authorId))

        const existingContact = await this.contactRepository.findByPhone(new PhoneAccount(phone))

        const contact =
            existingContact === null ? await this.createContact({ firstName, lastName, phone }, audit) : existingContact

        const reportContactUseCase = container.resolve(ReportContact)
        const reportContactEvents = await reportContactUseCase.execute(
            { contact, description, complaintCategory, complaintSeverity },
            audit
        )
        this.domainEvents.push(...reportContactEvents)

        return null
    }

    private async createContact(contactInfo: ContactInfo, audit: Audit): Promise<Contact> {
        const createContactUseCase = container.resolve(CreatePhoneContact)
        const createContactEvents = await createContactUseCase.execute(contactInfo, audit)
        this.domainEvents.push(...createContactEvents)

        const result = await this.contactRepository.findByPhone(new PhoneAccount(contactInfo.phone))
        if (result === null) {
            throw new NotFoundError('Unable to find contact')
        }
        return result
    }
}
