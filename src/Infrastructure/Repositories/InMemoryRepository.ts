import Entity from '@src/Domain/Base/Entity'
import UUID from '@src/Domain/Base/ValueObject/UUID'

export default class InMemoryRepository<IEntity extends Entity, IdType extends UUID> {
    protected storage: IEntity[] = []

    public async findById(id: IdType): Promise<IEntity | null> {
        for (let i = 0; i < this.storage.length; i++) {
            if (this.storage[i].getId().isEqual(id)) {
                return this.storage[i]
            }
        }
        return null
    }

    public async create(entity: IEntity): Promise<null> {
        this.storage.push(entity)
        return null
    }

    public async update(entity: IEntity): Promise<null> {
        for (let i = 0; i < this.storage.length; i++) {
            if (this.storage[i].isEqual(entity)) {
                this.storage[i] = entity
                return null
            }
        }
        return null
    }

    public async delete(entity: IEntity): Promise<null> {
        this.storage = this.storage.filter(item => !item.isEqual(entity))
        return null
    }

    public async count(): Promise<number> {
        return this.storage.length
    }
}
