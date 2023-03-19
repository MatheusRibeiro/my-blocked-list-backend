import { injectable, inject, container } from 'tsyringe'
import IContactRepository from '@src/Domain/Aggregates/Contact/IContactRepository'
import Phone from '@src/Domain/Base/ValueObject/Phone'
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

    public execute = async (complaintInfo: CreateComplaintRequest, authorId: string): Promise<null> => {
        const audit = new Audit(new UserId(authorId))

        const { firstName, lastName, phone } = complaintInfo
        const contact = await this.getOrCreateContact({ firstName, lastName, phone }, audit)

        const { description, complaintCategory, complaintSeverity } = complaintInfo
        await this.createContactReport({ description, complaintCategory, complaintSeverity, contact }, audit)

        return null
    }

    private async getOrCreateContact(contactInfo: CreatePhoneContactDTO, audit: Audit): Promise<Contact> {
        const { phone } = contactInfo
        const foundContact = await this.contactRepository.findByPhone(new Phone(phone))
        if (foundContact !== null) {
            return foundContact
        }
        return await this.createContact(contactInfo, audit)
    }

    private async createContact(contactInfo: CreatePhoneContactDTO, audit: Audit): Promise<Contact> {
        const createContactUseCase = container.resolve(CreatePhoneContact)
        const createContactEvents = await createContactUseCase.execute(contactInfo, audit)
        this.domainEvents.push(...createContactEvents)

        const result = await this.contactRepository.findByPhone(new Phone(contactInfo.phone))
        if (result === null) {
            throw new NotFoundError('Unable to find contact')
        }
        return result
    }

    private async createContactReport(reportInfo: ReportContactDTO, audit: Audit): Promise<null> {
        const reportContactUseCase = container.resolve(ReportContact)
        const reportContactEvents = await reportContactUseCase.execute(reportInfo, audit)
        this.domainEvents.push(...reportContactEvents)

        return null
    }
}
