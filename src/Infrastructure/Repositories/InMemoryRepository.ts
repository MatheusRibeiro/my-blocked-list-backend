import Entity from '../../Domain/Base/Entity'
import UUID from '../../Domain/Base/ValueObject/UUID'

export default class InMemoryRepository<IEntity extends Entity, IdType extends UUID> {
  protected storage: IEntity[] = []

  public async findById (id: IdType): Promise<IEntity | void> {
    for (let i = 0; i < this.storage.length; i++) {
      if (this.storage[i].getId().isEqual(id)) {
        return this.storage[i]
      }
    }
  }

  public async create (entity: IEntity): Promise<void> {
    this.storage.push(entity)
  }

  public async update (entity: IEntity): Promise<void> {
    for (let i = 0; i < this.storage.length; i++) {
      if (this.storage[i].isEqual(entity)) {
        this.storage[i] = entity
        return
      }
    }
  }

  public async delete (entity: IEntity): Promise<void> {
    this.storage = this.storage
      .filter(item => !item.isEqual(entity))
  }

  public async count (): Promise<number> {
    return this.storage.length
  }
}
