import ValueObject from "./ValueObject";

export default class PhoneAccount extends ValueObject<string> {
    public isValid() {
        const phoneRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
        return !!this.value.match(phoneRegex)
    }
}