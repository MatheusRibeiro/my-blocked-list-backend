import ValueObject from "../../../Base/ValueObject";

export default class EmailAccount extends ValueObject<string> {
    public isEqual(other: EmailAccount) {
        return this.value === other.value
    }

    public isValid() {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        return !!this.value.match(emailRegex)
    }
}