export default abstract class ValueObject<T = object | number | string | boolean> {
    constructor(protected readonly value: T) {}

    public getValue(): T {
        return this.value
    }

    public abstract isValid(): boolean

    public isEqual(other: ValueObject<T>): boolean {
        return JSON.stringify(this.toJSON()) === JSON.stringify(other.toJSON())
    }

    abstract toJSON(): object | number | string | boolean
}
