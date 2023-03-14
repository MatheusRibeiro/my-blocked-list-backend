import ValueObject from './ValueObject'

export default class PhoneAccount extends ValueObject<string> {
    public isValid(): boolean {
        const phoneRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
        const match = this.value.match(phoneRegex)
        return !(match == null)
    }
}
