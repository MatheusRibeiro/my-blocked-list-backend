import ValueObject from '../AbstractValueObject'

export default abstract class TextValueObject extends ValueObject<string> {
    abstract minLength: number
    abstract maxLength: number

    public isValid(): boolean {
        return this.value.length >= this.minLength && this.value.length <= this.maxLength
    }
}
