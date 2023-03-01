export default abstract class ValueObject<T> {
    protected value: T

    constructor(value:T) {
        this.value = value
    }

    public abstract isEqual(other: ValueObject<T>): boolean
}
