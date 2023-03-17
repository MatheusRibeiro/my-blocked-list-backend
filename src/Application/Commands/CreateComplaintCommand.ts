import { injectable, inject, container } from 'tsyringe'
import IContactRepository from '@src/Domain/Aggregates/Contact/IContactRepository'
import PhoneAccount from '@src/Domain/Base/ValueObject/Phone'
import Contact from '@src/Domain/Aggregates/Contact/Contact'
import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'
import CreatePhoneContact, {
    type CreatePhoneContactDTO,
} from '@src/Domain/Aggregates/Contact/UseCases/CreatePhoneContact'
import ReportContact, { type ReportContactDTO } from '@src/Domain/Aggregates/Complaint/UseCases/ReportContact'
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
    private readonly domainEvents: Array<DomainEvent<object>> = []

    constructor(@inject('ContactRepository') contactRepository: IContactRepository) {
        this.contactRepository = contactRepository
    }

    public execute = async (
        { firstName, lastName, description, complaintCategory, complaintSeverity, phone }: CreateComplaintRequest,
        authorId: string
    ): Promise<null> => {
        const audit = new Audit(new UserId(authorId))

        const foundContact = await this.contactRepository.findByPhone(new PhoneAccount(phone))

        const contactInfo = { firstName, lastName, phone }
        const contact = foundContact === null ? await this.createContact(contactInfo, audit) : foundContact

        const reportContactUseCase = container.resolve(ReportContact)
        const reportInfo: ReportContactDTO = { contact, description, complaintCategory, complaintSeverity }
        const reportContactEvents = await reportContactUseCase.execute(reportInfo, audit)
        this.domainEvents.push(...reportContactEvents)

        return null
    }

    private async createContact(contactInfo: CreatePhoneContactDTO, audit: Audit): Promise<Contact> {
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
