import Entity from '@src/Domain/Base/Abstractions/Entity'
import UserId from '@src/Domain/Aggregates/User/ValueObjects/UserId'
import ComplaintDescription from './ValueObjects/ComplaintDescription'
import ComplaintId from './ValueObjects/ComplaintId'
import ComplaintType from './ValueObjects/ComplaintType'

export interface ComplaintJson {
    id: string
    description: string
    complaint_type: object
    author: { id: string }
}

export default class Complaint extends Entity {
    public complaintId: ComplaintId
    public description: ComplaintDescription
    public complaintType: ComplaintType
    public authorId: UserId

    constructor(
        complaintId: ComplaintId,
        description: ComplaintDescription,
        complaintType: ComplaintType,
        authorId: UserId
    ) {
        super()
        this.complaintId = complaintId
        this.description = description
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

    public canBeRemovedBy(userId: UserId): boolean {
        return this.authorId.isEqual(userId)
    }

    public toJSON(): ComplaintJson {
        return {
            id: this.complaintId.toJSON(),
            description: this.description.toJSON(),
            complaint_type: this.complaintType.toJSON(),
            author: { id: this.authorId.toJSON() },
        }
    }
}
