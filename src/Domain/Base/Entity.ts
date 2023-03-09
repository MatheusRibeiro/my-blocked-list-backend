import UUID from './ValueObject/UUID'

export default abstract class Entity {
  public abstract getId (): UUID
  public abstract isValid (): boolean
  public abstract isEqual (entity: Entity): boolean
}
