import Entity from './AbstractEntity'
import IRepository from './AbstractRepository'
import UUID from './ValueObject/UUID'

export default abstract class AbstractAggregateRoot<
    TEntity extends Entity,
    TId extends UUID,
    TRepository extends IRepository<TEntity, TId>
> {
    public readonly rootEntity: TEntity
    public readonly repository: TRepository

    constructor(rootEntity: TEntity, repository: TRepository) {
        this.rootEntity = rootEntity
        this.repository = repository
    }
}
