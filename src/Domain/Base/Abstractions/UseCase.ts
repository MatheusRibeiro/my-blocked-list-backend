import Audit from '../Audit'
import DomainEvent from './DomainEvent'
import IRepository from './Repository'
import Entity from './Entity'
import UUID from '../Types/UUID'

export default abstract class UseCase<
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
