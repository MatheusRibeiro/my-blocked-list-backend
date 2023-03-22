import { injectable, inject } from 'tsyringe'
import UseCase from '@src/Domain/Base/AbstractUseCase'
import Audit from '@src/Domain/Base/Audit'
import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'
import IComplaintRepository from '../IComplaintRepository'
import ComplaintId from '../ValueObjects/ComplaintId'
import UserId from '../../User/ValueObjects/UserId'
import NotFoundError from '@src/Domain/Errors/NotFoundError'
import ComplaintRemoved from '../DomainEvents/ComplaintRemoved'

const notFoundMessage = 'Complaint not found,'

export interface RemoveComplaintDTO {
    complaintId: ComplaintId
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
        { complaintId, userId }: RemoveComplaintDTO,
        audit: Audit
    ): Promise<Array<DomainEvent<object>>> => {
        const events: Array<DomainEvent<object>> = []

        const complaint = await this.complaintRepository.findById(complaintId)
        if (complaint === null) {
            throw new NotFoundError(notFoundMessage)
        }
        if (!complaint.authorId.isEqual(userId)) {
            throw new NotFoundError(notFoundMessage)
        }

        await this.complaintRepository.delete(complaint)

        events.push(new ComplaintRemoved({ complaint: complaint.toJSON() }, audit))
        return events
    }
}
