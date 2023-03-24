import { injectable, inject } from 'tsyringe'
import IContactRepository from '@src/Domain/Aggregates/Contact/IContactRepository'
import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'
import Audit from '@src/Domain/Base/Audit'
import UserId from '@src/Domain/Aggregates/User/ValueObjects/UserId'
import ContactAggregate from '@src/Domain/Aggregates/Contact/ContactAggregate'

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
        const { phone, firstName, lastName } = complaintInfo
        const contactAggregate = await ContactAggregate.factoryByPhone(
            { firstName, lastName, phone },
            this.contactRepository
        )
        const audit = new Audit(new UserId(authorId))
        const { description, complaintCategory, complaintSeverity } = complaintInfo
        const events = await contactAggregate.createComplaint(
            { description, complaintCategory, complaintSeverity, userId: authorId },
            audit
        )

        this.domainEvents.push(...events)
        return null
    }
}
