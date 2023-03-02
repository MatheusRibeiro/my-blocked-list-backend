import ValueObject from "./ValueObject";

export default class UUID extends ValueObject<string> {
    public isValid(other: ValueObject<string>): boolean {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
        return !!this.value.match(uuidRegex)
    }

}