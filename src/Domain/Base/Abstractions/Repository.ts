import Entity from './Entity'
import UUID from '../ValueObject/UUID'

export default interface IRepository<TEntity extends Entity, TId extends UUID> {
    create: (entity: TEntity) => Promise<null>
    update: (entity: TEntity) => Promise<null>
    delete: (entity: TEntity) => Promise<null>
    findById: (id: TId) => Promise<TEntity | null>
}
