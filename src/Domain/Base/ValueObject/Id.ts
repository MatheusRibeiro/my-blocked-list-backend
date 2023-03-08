import ValueObject from './ValueObject'

export default abstract class Id<T> extends ValueObject<T | undefined> {
    constructor (value?: T) {
        super(value)
        if (value === undefined) this.value = this.generate()
    }
    abstract generate (): T
}
