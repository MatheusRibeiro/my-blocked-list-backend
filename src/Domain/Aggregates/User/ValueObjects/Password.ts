import ValueObject from '../../../Base/AbstractValueObject'

const MIN_LENGTH = 6

export default class Password extends ValueObject<string> {
    public isValid(): boolean {
        return typeof this.value === 'string' && this.value.length >= MIN_LENGTH
    }
}
