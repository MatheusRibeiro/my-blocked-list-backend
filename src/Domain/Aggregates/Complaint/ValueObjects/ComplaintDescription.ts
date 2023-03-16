import ValueObject from '../../../Base/AbstractValueObject'

const MIN_LENGTH = 5
const MAX_LENGTH = 255

export default class ComplaintDescription extends ValueObject<string> {
    public isValid(): boolean {
        return this.value.length >= MIN_LENGTH && this.value.length <= MAX_LENGTH
    }
}
