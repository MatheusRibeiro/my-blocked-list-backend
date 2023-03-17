import Audit from './Audit'
import UUID, { uuidFactory } from './ValueObject/UUID'

export default abstract class DomainEvent<Payload> {
    public readonly eventId: UUID
    abstract name: string
    public readonly payload: Payload
    public readonly audit: Audit
    abstract readonly version: number

    constructor(payload: Payload, audit: Audit) {
        this.eventId = uuidFactory()
        this.payload = payload
        this.audit = audit
    }

    public toJSON(): object {
        return {
            id: this.eventId.toJSON(),
            name: this.name,
            payload: this.payload,
            audit: this.audit.toJSON(),
            version: this.version,
        }
    }
}
