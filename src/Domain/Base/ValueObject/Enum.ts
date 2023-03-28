import BadRequestError from '@src/Domain/Errors/BadRequestError'
import ValueObject from '../AbstractValueObject'

export default abstract class Enum extends ValueObject<string> {
    protected readonly validValues: string[]
    constructor(value: string, validValues: string[]) {
        super(value)
        this.validValues = validValues
        this.validate()
    }

    public isValid(): boolean {
        return this.validValues.includes(this.value)
    }

    public validate(): null {
        if (!this.isValid()) {
            throw new BadRequestError(`Invalid value for ${this.constructor.name}`)
        }
        return null
    }

    public toJSON(): string {
        return this.value
    }
}
