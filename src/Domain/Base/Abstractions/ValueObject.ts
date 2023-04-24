type Value = object | number | string | boolean
type JsonValue = object | number | string | boolean

export default abstract class ValueObject<T extends Value, Tjson extends JsonValue = Value> {
    protected readonly error: string | undefined
    constructor(protected readonly value: T) {
        if (!this.isValid()) {
            this.error = `Invalid value for ${this.constructor.name}: ${JSON.stringify(value)}`
        }
    }

    public getValue(): T {
        return this.value
    }

    public getError(): string | undefined {
        return this.error
    }

    public isEqual(other: ValueObject<T>): boolean {
        return JSON.stringify(this.toJSON()) === JSON.stringify(other.toJSON())
    }

    public abstract isValid(): boolean
    abstract toJSON(): Tjson

    public getValidatedInstance(): Valid<ValueObject<T, Tjson>> {
        return new Valid<ValueObject<T, Tjson>>(this)
    }
}

export class Valid<T extends ValueObject<any, any>> {
    constructor(protected valueObject: T) {
        if (valueObject.getError() !== undefined) {
            throw new Error(valueObject.getError())
        }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public getValue() {
        return this.valueObject.getValue()
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    public toJSON() {
        return this.valueObject.toJSON()
    }

    public isEqual(other: Valid<ValueObject<Value>>): boolean {
        return JSON.stringify(this.toJSON()) === JSON.stringify(other.toJSON())
    }
}
export function valid(valueObject: ValueObject<Value>): Valid<ValueObject<Value>> {
    return new Valid<ValueObject<Value>>(valueObject)
}
