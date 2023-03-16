import { injectable, inject } from 'tsyringe'
import IComplaintRepository from '../IComplaintRepository'
import UseCase from '../../../Base/AbstractUseCase'
import Audit from '../../../Base/Audit'
import DomainEvent from '../../../Base/AbstractDomainEvent'
import ContactReported from '../DomainEvents/ContactReported'
import Contact from '../../Contact/Contact'
import { ComplaintCategory, ComplaintSeverity } from '../ValueObjects/ComplaintType'
import { complaintFactoryWithoutId } from '../ComplaintFactory'

export interface ReportContactDTO {
    contact: Contact
    description: string
    complaintCategory: ComplaintCategory
    complaintSeverity: ComplaintSeverity
}

@injectable()
export default class ReportContact extends UseCase<ReportContactDTO> {
    private readonly complaintRepository: IComplaintRepository

    constructor(@inject('ComplaintRepository') complaintRepository: IComplaintRepository) {
        super()
        this.complaintRepository = complaintRepository
    }

    public execute = async (
        { contact, description, complaintCategory, complaintSeverity }: ReportContactDTO,
        audit: Audit
    ): Promise<Array<DomainEvent<object>>> => {
        const events: Array<DomainEvent<object>> = []

        const complaint = complaintFactoryWithoutId({
            description,
            authorId: audit.who.value,
            contactId: contact.contactId.value,
            category: complaintCategory,
            severity: complaintSeverity,
        })
        complaint.validate()
        await this.complaintRepository.create(complaint)

        events.push(new ContactReported({ complaint, contactReported: contact }, audit))
        return events
    }
}
