type Value = object | number | string | boolean

export default abstract class ValueObject<T extends Value> {
    protected readonly error: string | undefined
    constructor(protected readonly value: T) {
        if (!this.isValid()) {
            this.error = `Invalid value for ${this.constructor.name}: ${this.toString()}}`
        }
    }

    public getValue(): T {
        if (this.error !== undefined) {
            throw new Error(this.error)
        }
        return this.value
    }

    public getError(): string | undefined {
        return this.error
    }

    public toJSON(): object | number | string | boolean {
        return this.getValue()
    }

    public toString(): string {
        if (typeof this.value === 'object') {
            return JSON.stringify(this.toJSON()).replace(/"/g, "'")
        }
        return this.value.toString()
    }

    public isEqual(other: ValueObject<T>): boolean {
        return JSON.stringify(this.getValue()) === JSON.stringify(other.getValue())
    }

    public abstract isValid(): boolean
}
