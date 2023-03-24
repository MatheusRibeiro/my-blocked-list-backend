import { container } from 'tsyringe'
import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'
import RemovePhoneComplaintUseCase, {
    RemoveComplaintDTO,
} from '@src/Domain/Aggregates/Contact/UseCases/RemovePhoneComplaint'
import UUID from '@src/Domain/Base/ValueObject/UUID'
import Audit from '@src/Domain/Base/Audit'

interface RemovePhoneComplaintRequest extends RemoveComplaintDTO {}

export default class CreatePhoneComplaintCommand {
    private readonly domainEvents: Array<DomainEvent<object>> = []
    private readonly useCase: RemovePhoneComplaintUseCase

    constructor() {
        this.useCase = container.resolve(RemovePhoneComplaintUseCase)
    }

    public execute = async (request: RemovePhoneComplaintRequest, authorId: string): Promise<null> => {
        const audit = new Audit(new UUID(authorId))
        const events = await this.useCase.execute(request, audit)
        this.domainEvents.push(...events)
        return null
    }
}
