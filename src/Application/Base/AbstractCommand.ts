import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'
import UUID from '@src/Domain/Base/ValueObject/UUID'
import Audit from '@src/Domain/Base/Audit'
import AbstractUseCase from '@src/Domain/Base/AbstractUseCase'
import Entity from '@src/Domain/Base/AbstractEntity'
import IRepository from '@src/Domain/Base/AbstractRepository'

export default class CreatePhoneComplaintCommand<
    DTO,
    TEntity extends Entity,
    TId extends UUID,
    TRepository extends IRepository<TEntity, TId>,
    UseCase extends AbstractUseCase<DTO, TEntity, TId, TRepository>
> {
    protected readonly domainEvents: Array<DomainEvent<object>> = []
    protected readonly useCase: UseCase

    constructor(useCase: UseCase) {
        this.useCase = useCase
    }

    public execute = async (request: DTO, authorId: string): Promise<null> => {
        const audit = new Audit(new UUID(authorId))
        const events = await this.useCase.execute(request, audit)
        this.domainEvents.push(...events)
        return null
    }
}
