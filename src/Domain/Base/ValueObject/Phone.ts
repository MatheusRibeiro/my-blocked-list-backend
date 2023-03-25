import ValidValueObject from './AbstractValidValueObject'

export default class Phone extends ValidValueObject<string> {
    public isValid(): boolean {
        const phoneRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
        const match = this.value.match(phoneRegex)
        return !(match == null)
    }

    public toJSON(): string {
        return this.value
    }
}
