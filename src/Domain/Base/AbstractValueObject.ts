export default abstract class ValueObject<T> {
    public value: T

    constructor(value: T) {
        this.value = value
    }

    public abstract isValid(other: ValueObject<T>): boolean

    public isEqual(other: ValueObject<T>): boolean {
        return JSON.stringify(this.toJSON()) === JSON.stringify(other.toJSON())
    }

    public toJSON(): T {
        return this.value
    }
}
