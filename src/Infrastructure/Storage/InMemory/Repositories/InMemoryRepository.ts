import Entity from '@src/Domain/Base/AbstractEntity'
import UUID from '@src/Domain/Base/ValueObject/UUID'
import dbContext from '../DbContext'

export default class InMemoryRepository<IEntity extends Entity, IdType extends UUID> {
    protected readonly tableName: string

    constructor() {
        this.tableName = this.constructor.name
        dbContext[this.tableName] = [] as IEntity[]
    }

    public async findById(id: IdType): Promise<IEntity | null> {
        for (let i = 0; i < dbContext[this.tableName].length; i++) {
            if (dbContext[this.tableName][i].getId().isEqual(id)) {
                return dbContext[this.tableName][i] as IEntity
            }
        }
        return null
    }

    public async create(entity: IEntity): Promise<null> {
        dbContext[this.tableName].push(entity)
        return null
    }

    public async update(entity: IEntity): Promise<null> {
        for (let i = 0; i < dbContext[this.tableName].length; i++) {
            if (dbContext[this.tableName][i].isEqual(entity)) {
                dbContext[this.tableName][i] = entity
                return null
            }
        }
        return null
    }

    public async delete(entity: IEntity): Promise<null> {
        dbContext[this.tableName] = dbContext[this.tableName].filter(item => !item.isEqual(entity))
        return null
    }

    public async count(): Promise<number> {
        return dbContext[this.tableName].length
    }
}
