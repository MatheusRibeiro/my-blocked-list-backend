import { injectable, inject, container } from 'tsyringe'
import IComplaintRepository from '@src/Domain/Aggregates/Complaint/IComplaintRepository'
import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'
import RemoveComplaint, { type RemoveComplaintDTO } from '@src/Domain/Aggregates/Complaint/UseCases/RemoveComplaint'
import Audit from '@src/Domain/Base/Audit'
import UserId from '@src/Domain/Aggregates/User/ValueObjects/UserId'
import ComplaintId from '@src/Domain/Aggregates/Complaint/ValueObjects/ComplaintId'
import NotFoundError from '@src/Domain/Errors/NotFoundError'

const notFoundMessage = 'Complaint not found,'

interface DeleteComplaintRequest {
    complaintId: string
}

@injectable()
export default class CreateComplaintCommand {
    private readonly complaintRepository: IComplaintRepository
    private readonly domainEvents: Array<DomainEvent<object>> = []

    constructor(@inject('ComplaintRepository') complaintRepository: IComplaintRepository) {
        this.complaintRepository = complaintRepository
    }

    public execute = async ({ complaintId }: DeleteComplaintRequest, authorId: string): Promise<null> => {
        const userId = new UserId(authorId)
        const audit = new Audit(userId)

        const complaint = await this.complaintRepository.findById(new ComplaintId(complaintId))
        if (complaint === null) {
            throw new NotFoundError(notFoundMessage)
        }
        if (!complaint.authorId.isEqual(userId)) {
            throw new NotFoundError(notFoundMessage)
        }
        const removeComplaintUseCase = container.resolve(RemoveComplaint)
        const removeComplaintDTO: RemoveComplaintDTO = { complaint, userId }
        const removeComplaintsEvents = await removeComplaintUseCase.execute(removeComplaintDTO, audit)
        this.domainEvents.push(...removeComplaintsEvents)

        // delete contact if there is no longer complaints associated with it
        return null
    }
}
