import { injectable, inject } from 'tsyringe'
import IContactRepository from '@src/Domain/Aggregates/Contact/IContactRepository'
import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'
// import RemoveComplaint, { type RemoveComplaintDTO } from '@src/Domain/Aggregates/Contact/UseCases/RemoveComplaint'
// import Audit from '@src/Domain/Base/Audit'
import UserId from '@src/Domain/Aggregates/User/ValueObjects/UserId'
import ComplaintId from '@src/Domain/Aggregates/Contact/Complaint/ValueObjects/ComplaintId'
import NotFoundError from '@src/Domain/Errors/NotFoundError'
import ContactId from '@src/Domain/Aggregates/Contact/ValueObjects/ContactId'

const notFoundMessage = 'Complaint not found,'

interface RemoveComplaintRequest {
    contactId: string
    complaintId: string
}

@injectable()
export default class RemoveComplaintCommand {
    private readonly contactRepository: IContactRepository
    private readonly domainEvents: Array<DomainEvent<object>> = []

    constructor(@inject('ContactRepository') contactRepository: IContactRepository) {
        this.contactRepository = contactRepository
    }

    public execute = async ({ complaintId, contactId }: RemoveComplaintRequest, authorId: string): Promise<null> => {
        const userId = new UserId(authorId)
        // const audit = new Audit(userId)

        const contact = await this.contactRepository.findById(new ContactId(contactId))
        if (contact === null) {
            throw new NotFoundError(notFoundMessage)
        }

        const complaintIdToBeRemoved = new ComplaintId(complaintId)
        for (let i = 0; i < contact.complaints.length; i++) {
            const shouldBeRemoved = contact.complaints[i].complaintId.isEqual(complaintIdToBeRemoved)
            const canBeRemoved = contact.complaints[i].authorId.isEqual(userId)
            if (shouldBeRemoved && !canBeRemoved) {
                throw new NotFoundError(notFoundMessage)
            }
            if (shouldBeRemoved) {
                contact.complaints.splice(i, 1)
            }
        }
        if (contact.complaints.length === 0) {
            await this.contactRepository.delete(contact)
        } else {
            await this.contactRepository.update(contact)
        }
        return null
    }
}
