import ValueObject from '../Abstractions/ValueObject'

export default class UUID extends ValueObject<string> {
    public isValid(): boolean {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
        const match = this.value.match(uuidRegex)
        return !(match == null)
    }

    public toJSON(): string {
        return this.value
    }
}
