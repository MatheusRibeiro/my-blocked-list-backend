export default abstract class Entity {
    public abstract isValid(): boolean
    public abstract isEqual(entity: Entity): boolean

}