import ValidValueObject from './AbstractValidValueObject'

export default class Email extends ValidValueObject<string> {
    public isValid(): boolean {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        const match = this.value.match(emailRegex)
        return !(match == null)
    }

    public toJSON(): string {
        return this.value
    }
}
