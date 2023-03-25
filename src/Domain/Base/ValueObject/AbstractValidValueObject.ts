import BadRequestError from '@src/Domain/Errors/BadRequestError'
import AbstractValueObject from '../AbstractValueObject'

export default abstract class AbstractValidValueObject<T> extends AbstractValueObject<T> {
    constructor(value: T) {
        super(value)
        this.validate()
    }

    public validate(): null {
        if (!this.isValid()) {
            throw new BadRequestError(`Invalid value for ${this.constructor.name}`)
        }
        return null
    }
}
