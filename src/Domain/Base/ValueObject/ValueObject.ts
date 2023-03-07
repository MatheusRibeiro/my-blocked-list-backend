export default abstract class ValueObject<T> {
    public value: T

    constructor(value:T) {
        this.value = value
    }

    public abstract isValid(other: ValueObject<T>): boolean

    public isEqual(other: ValueObject<T>): boolean {
        return JSON.stringify(this.toJson()) === JSON.stringify(other.toJson())
    }
    public toJson(): T {
        return this.value
    }
}
