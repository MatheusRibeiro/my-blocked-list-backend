import { v4 as uuidv4 } from 'uuid'
import Id from "./Id"

export default class UUID extends Id<string> {
    public isValid(): boolean {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
        return !!this.value?.match(uuidRegex)
    }

    public generate(): string {
        return uuidv4()
    }
}