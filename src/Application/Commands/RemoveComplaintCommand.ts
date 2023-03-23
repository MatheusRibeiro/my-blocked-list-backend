import { injectable, inject } from 'tsyringe'
import IContactRepository from '@src/Domain/Aggregates/Contact/IContactRepository'
import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'
import ContactAggregate from '@src/Domain/Aggregates/Contact/ContactAggregate'
import UUID from '@src/Domain/Base/ValueObject/UUID'
import Audit from '@src/Domain/Base/Audit'

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

    public execute = async (request: RemoveComplaintRequest, authorId: string): Promise<null> => {
        const userId = new UUID(authorId)
        const contactId = new UUID(request.contactId)
        const complaintId = new UUID(request.complaintId)

        const audit = new Audit(userId)
        const contactAggregate = await ContactAggregate.factoryById(contactId, this.contactRepository)
        const events = await contactAggregate.removeComplaint({ complaintId, userId }, audit)

        this.domainEvents.push(...events)
        return null
    }
}
