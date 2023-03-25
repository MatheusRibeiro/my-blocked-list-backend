import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'
import UUID from '@src/Domain/Base/ValueObject/UUID'
import Audit from '@src/Domain/Base/Audit'
import AbstractUseCase from '@src/Domain/Base/AbstractUseCase'
import Entity from '@src/Domain/Base/AbstractEntity'
import IRepository from '@src/Domain/Base/AbstractRepository'
import AbstractMapper from './AbstractMapper'

export default abstract class AbstractCommand<
    RequestData,
    UseCaseInput,
    InputMapper extends AbstractMapper<RequestData, UseCaseInput>,
    TEntity extends Entity,
    TId extends UUID,
    TRepository extends IRepository<TEntity, TId>,
    UseCase extends AbstractUseCase<UseCaseInput, TEntity, TId, TRepository>
> {
    protected readonly domainEvents: Array<DomainEvent<object>> = []
    protected readonly useCase: UseCase
    protected readonly inputMapper: InputMapper

    constructor(useCase: UseCase, inputMapper: InputMapper) {
        this.useCase = useCase
        this.inputMapper = inputMapper
    }

    public execute = async (request: RequestData, authorId: string): Promise<null> => {
        const audit = new Audit(new UUID(authorId))
        const events = await this.useCase.execute(this.inputMapper(request), audit)
        this.domainEvents.push(...events)
        return null
    }
}
