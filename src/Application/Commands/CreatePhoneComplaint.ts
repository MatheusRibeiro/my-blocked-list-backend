import { container } from 'tsyringe'
import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'
import CreatePhoneComplaintUseCase, {
    CreatePhoneComplaintDTO,
} from '@src/Domain/Aggregates/Contact/UseCases/CreatePhoneComplaint'
import UUID from '@src/Domain/Base/ValueObject/UUID'
import Audit from '@src/Domain/Base/Audit'

interface CreatePhoneComplaintRequest extends CreatePhoneComplaintDTO {}

export default class CreatePhoneComplaintCommand {
    private readonly domainEvents: Array<DomainEvent<object>> = []
    private readonly useCase: CreatePhoneComplaintUseCase

    constructor() {
        this.useCase = container.resolve(CreatePhoneComplaintUseCase)
    }

    public execute = async (request: CreatePhoneComplaintRequest, authorId: string): Promise<null> => {
        const audit = new Audit(new UUID(authorId))
        const events = await this.useCase.execute(request, audit)
        this.domainEvents.push(...events)
        return null
    }
}
