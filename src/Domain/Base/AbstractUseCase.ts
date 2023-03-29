import Audit from './Audit'
import DomainEvent from './AbstractDomainEvent'
import IRepository from './AbstractRepository'
import Entity from './AbstractEntity'
import UUID from './ValueObject/UUID'

export default abstract class AbstractUseCase<
    DTO,
    TEntity extends Entity,
    TId extends UUID,
    Repository extends IRepository<TEntity, TId>
> {
    protected readonly repository: Repository

    constructor(repository: Repository) {
        this.repository = repository
    }
    abstract execute(dto: DTO, audit: Audit): Promise<DomainEvent[]>
}
