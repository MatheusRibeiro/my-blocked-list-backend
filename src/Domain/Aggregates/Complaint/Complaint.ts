import Entity from '../../Base/AbstractEntity'
import ContactId from '../Contact/ValueObjects/ContactId'
import UserId from '../User/ValueObjects/UserId'
import ComplaintDescription from './ValueObjects/ComplaintDescription'
import ComplaintId from './ValueObjects/ComplaintId'
import ComplaintType from './ValueObjects/ComplaintType'

export interface ComplaintJson {
    id: string
    description: string
    contact: { id: string }
    complaint_type: object
    author: { id: string }
}

export default class Complaint extends Entity {
    public complaintId: ComplaintId
    public description: ComplaintDescription
    public contactId: ContactId
    public complaintType: ComplaintType
    public authorId: UserId

    constructor(
        complaintId: ComplaintId,
        description: ComplaintDescription,
        contactId: ContactId,
        complaintType: ComplaintType,
        authorId: UserId
    ) {
        super()
        this.complaintId = complaintId
        this.description = description
        this.contactId = contactId
        this.complaintType = complaintType
        this.authorId = authorId
    }

    public getId(): ComplaintId {
        return this.complaintId
    }

    public isValid(): boolean {
        return this.description.isValid() && this.complaintType.isValid()
    }

    public isEqual(entity: Complaint): boolean {
        return this.complaintId.isEqual(entity.complaintId)
    }

    public toJSON(): ComplaintJson {
        return {
            id: this.complaintId.toJSON(),
            description: this.description.toJSON(),
            contact: { id: this.contactId.toJSON() },
            complaint_type: this.complaintType.toJSON(),
            author: { id: this.authorId.toJSON() },
        }
    }
}
