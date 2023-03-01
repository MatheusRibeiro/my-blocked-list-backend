import ValueObject from "../../../Base/ValueObject";
import IAccount from "./IAccount";

export default class PhoneAccount extends ValueObject<string> implements IAccount {
    public isEqual(other: PhoneAccount) {
        return this.value === other.value
    }

    public isValid() {
        const phoneRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
        return !!this.value.match(phoneRegex)
    }
}