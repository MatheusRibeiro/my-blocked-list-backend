import Id from "./ValueObject/Id";

export default abstract class Entity {
    public abstract getId() : Id<unknown>
    public abstract isValid(): boolean
    public abstract isEqual(entity: Entity): boolean

}