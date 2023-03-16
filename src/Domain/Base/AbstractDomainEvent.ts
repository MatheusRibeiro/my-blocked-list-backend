import Audit from './Audit'

export default abstract class DomainEvent<Payload> {
    abstract name: string
    public readonly audit: Audit
    public readonly payload: Payload

    constructor(payload: Payload, audit: Audit) {
        this.payload = payload
        this.audit = audit
    }
}
