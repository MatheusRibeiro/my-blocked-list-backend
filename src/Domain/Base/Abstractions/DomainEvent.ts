import Audit from '../Audit'
import UUID from '../ValueObject/UUID'

export default abstract class DomainEvent {
    public readonly eventId: UUID
    public readonly audit: Audit
    abstract readonly version: number

    constructor(audit: Audit) {
        this.eventId = UUID.generate()
        this.audit = audit
    }

    abstract getPayload(): object

    public toJSON(): object {
        return {
            id: this.eventId,
            name: this.constructor.name,
            payload: this.getPayload(),
            audit: this.audit.toJSON(),
            version: this.version,
        }
    }
}
