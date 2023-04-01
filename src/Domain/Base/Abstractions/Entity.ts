import BadRequestError from '@src/Domain/Errors/BadRequestError'
import UUID from '../Types/UUID'

export default abstract class Entity {
    public abstract getId(): UUID
    public abstract isValid(): boolean
    public abstract isEqual(entity: Entity): boolean
    public validate = (): null => {
        if (!this.isValid()) throw new BadRequestError(`Invalid paramenters for ${this.constructor.name}.`)
        return null
    }
    public abstract toJSON(): object
}
