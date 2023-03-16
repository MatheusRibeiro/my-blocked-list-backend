import { inject, injectable } from 'tsyringe'
import IContactRepository from '@src/Domain/Aggregates/Contact/IContactRepository'
import PhoneAccount from '@src/Domain/Base/ValueObject/Phone'
import NotFoundError from '@src/Domain/Errors/NotFoundError'
import IComplaintQueryRepository from './IComplaintQueryRespository'
import Complaint from '@src/Domain/Aggregates/Complaint/Complaint'

export interface ComplaintDTO {
    complaintId: string
    description: string
    category: number
    severity: number
}

export interface queryParameters {
    phone: string
}

@injectable()
export default class GetComplaintsFromContactQuery {
    private readonly contactRepository: IContactRepository
    private readonly complaintRepository: IComplaintQueryRepository
    constructor(
        @inject('ContactRepository') contactRepository: IContactRepository,
        @inject('ComplaintQueryRepository') complaintRepository: IComplaintQueryRepository
    ) {
        this.contactRepository = contactRepository
        this.complaintRepository = complaintRepository
    }

    public execute = async ({ phone }: queryParameters): Promise<ComplaintDTO[]> => {
        const contact = await this.contactRepository.findByPhone(new PhoneAccount(phone))
        if (contact === null) {
            throw new NotFoundError('Contact not found')
        }
        const complaints = await this.complaintRepository.findByContactId(contact.contactId)
        if (complaints === null) {
            return []
        }
        return complaints.map(this.toDTO)
    }

    private toDTO(complaint: Complaint): ComplaintDTO {
        return {
            complaintId: complaint.complaintId.value,
            description: complaint.description.value,
            category: complaint.complaintType.value.complaintCategory,
            severity: complaint.complaintType.value.complaintSeverity,
        }
    }
}
