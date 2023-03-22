import { ComplaintJson } from '../Complaint'
import DomainEvent from '@src/Domain/Base/AbstractDomainEvent'

export interface ComplaintRemovedPayload {
    complaint: ComplaintJson
}

export default class ComplaintRemoved extends DomainEvent<ComplaintRemovedPayload> {
    public readonly name = 'ContactReported'
    public readonly version = 1
}
