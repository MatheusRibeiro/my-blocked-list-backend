import ValueObject from "./ValueObject";

export default class EmailAccount extends ValueObject<string> {
    public isValid() {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        return !!this.value.match(emailRegex)
    }
}