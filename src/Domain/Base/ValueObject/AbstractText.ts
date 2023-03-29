import ValueObject from '../Abstractions/ValueObject'

export default abstract class TextValueObject extends ValueObject<string> {
    abstract minLength: number
    abstract maxLength: number

    public isValid(): boolean {
        return this.value.length >= this.minLength && this.value.length <= this.maxLength
    }

    public toJSON(): string {
        return this.value
    }
}
