import Entity from '@src/Domain/Base/Abstractions/Entity'
import UserId from '@src/Domain/Aggregates/User/ValueObjects/UserId'
import ComplaintDescription from './ValueObjects/ComplaintDescription'
import ComplaintId from './ValueObjects/ComplaintId'
import ComplaintType from './ValueObjects/ComplaintType'

export interface ComplaintJson {
    id: string
    description: string
    type: {
        category: string
        severity: string
    }
    author: { id: string }
}

export default class Complaint extends Entity {
    protected readonly complaintId: ComplaintId
    protected description: ComplaintDescription
    protected complaintType: ComplaintType
    protected readonly authorId: UserId

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

    public getDescription(): string {
        return this.description.value
    }

    public getType(): ComplaintType {
        return this.complaintType
    }

    public isValid(): boolean {
        return this.description.isValid() && this.complaintType.isValid()
    }

    public isEqual(entity: Complaint): boolean {
        return this.complaintId === entity.complaintId
    }

    public canBeRemovedBy(userId: UserId): boolean {
        return this.authorId === userId
    }

    public toJSON(): ComplaintJson {
        return {
            id: this.complaintId,
            description: this.description.toJSON(),
            type: this.complaintType.toJSON(),
            author: { id: this.authorId },
        }
    }
}
