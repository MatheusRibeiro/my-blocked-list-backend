import ValueObject from "./ValueObject";
import { v4 as uuidv4 } from 'uuid'

export default class UUID extends ValueObject<string> {
    public isValid(other: ValueObject<string>): boolean {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
        return !!this.value.match(uuidRegex)
    }

    public static generate(): UUID {
        return new UUID(uuidv4())
    }
}