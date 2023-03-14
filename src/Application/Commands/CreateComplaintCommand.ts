import { injectable, inject } from 'tsyringe'
import { contactFactoryWithoutId } from '@src/Domain/Aggregates/Contact/ContactFactory'
import IContactRepository from '@src/Domain/Aggregates/Contact/IContactRepository'
import IComplaintRepository from '@src/Domain/Aggregates/Complaint/IComplaintRepository'
import PhoneAccount from '@src/Domain/Base/ValueObject/Phone'
import { complaintFactoryWithoutId } from '@src/Domain/Aggregates/Complaint/ComplaintFactory'
import Contact from '@src/Domain/Aggregates/Contact/Contact'

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
    private readonly complaintRepository: IComplaintRepository
    private readonly contactRepository: IContactRepository

    constructor(
        @inject('ComplaintRepository') complaintRepository: IComplaintRepository,
        @inject('ContactRepository') contactRepository: IContactRepository
    ) {
        this.complaintRepository = complaintRepository
        this.contactRepository = contactRepository
    }

    public execute = async (
        { firstName, lastName, description, complaintCategory, complaintSeverity, phone }: CreateComplaintRequest,
        authorId: string
    ): Promise<null> => {
        let contact: Contact
        const existingContact = await this.contactRepository.findByPhone(new PhoneAccount(phone))

        if (existingContact === null) {
            contact = contactFactoryWithoutId({ firstName, lastName, description, phone })
            await this.contactRepository.create(contact)
        } else {
            contact = existingContact
        }

        const complaint = complaintFactoryWithoutId({
            description,
            authorId,
            contactId: contact.contactId.value,
            category: complaintCategory,
            severity: complaintSeverity,
        })
        await this.complaintRepository.create(complaint)
        return null
    }
}
