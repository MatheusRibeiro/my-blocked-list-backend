import { injectable, inject } from 'tsyringe'
import UseCase from '@src/Domain/Base/AbstractUseCase'
import Audit from '@src/Domain/Base/Audit'
import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'
import IComplaintRepository from '../Complaint/IComplaintRepository'
import Complaint from '../Complaint/Complaint'
import UserId from '../../User/ValueObjects/UserId'
import ComplaintRemoved from '../DomainEvents/ComplaintRemoved'

export interface RemoveComplaintDTO {
    complaint: Complaint
    userId: UserId
}

@injectable()
export default class RemoveComplaint extends UseCase<RemoveComplaintDTO> {
    private readonly complaintRepository: IComplaintRepository

    constructor(@inject('ComplaintRepository') complaintRepository: IComplaintRepository) {
        super()
        this.complaintRepository = complaintRepository
    }

    public execute = async (
        { complaint, userId }: RemoveComplaintDTO,
        audit: Audit
    ): Promise<Array<DomainEvent<object>>> => {
        const events: Array<DomainEvent<object>> = []
        await this.complaintRepository.delete(complaint)

        events.push(new ComplaintRemoved({ complaint: complaint.toJSON() }, audit))
        return events
    }
}
