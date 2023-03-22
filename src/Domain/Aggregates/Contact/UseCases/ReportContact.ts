import { injectable, inject } from 'tsyringe'
import UseCase from '@src/Domain/Base/AbstractUseCase'
import Audit from '@src/Domain/Base/Audit'
import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'
import Contact from '@src/Domain/Aggregates/Contact/Contact'
import IContactRepository from '../IContactRepository'
import { ComplaintCategory, ComplaintSeverity } from '../Complaint/ValueObjects/ComplaintType'
import { complaintFactoryWithoutId } from '../Complaint/ComplaintFactory'
import ContactReported from '../DomainEvents/ContactReported'

export interface ReportContactDTO {
    contact: Contact
    description: string
    complaintCategory: ComplaintCategory
    complaintSeverity: ComplaintSeverity
}

@injectable()
export default class ReportContact extends UseCase<ReportContactDTO> {
    private readonly contactRepository: IContactRepository

    constructor(@inject('ContactRepository') contactRepository: IContactRepository) {
        super()
        this.contactRepository = contactRepository
    }

    public execute = async (
        { contact, description, complaintCategory, complaintSeverity }: ReportContactDTO,
        audit: Audit
    ): Promise<Array<DomainEvent<object>>> => {
        const events: Array<DomainEvent<object>> = []

        const complaint = complaintFactoryWithoutId({
            description,
            authorId: audit.who.value,
            category: complaintCategory,
            severity: complaintSeverity,
        })
        complaint.validate()
        contact.complaints.push(complaint)
        await this.contactRepository.update(contact)

        events.push(new ContactReported({ complaint: complaint.toJSON(), contact_reported: contact.toJSON() }, audit))
        return events
    }
}
