import Entity from "../../Base/Entity";
import UUID from "../../Base/ValueObject/UUID";
import ComplaintDescription from "./ValueObjects/ComplaintDescription";
import ComplaintType from "./ValueObjects/ComplaintType";

export default class Complaint extends Entity {
    public readonly complaintId: UUID
    public readonly description: ComplaintDescription
    public readonly contactId: UUID
    public readonly complaintType: ComplaintType

    constructor(
        complaintId: UUID,
        description: ComplaintDescription,
        contactId: UUID,
        complaintType: ComplaintType
    ) {
        super()

        this.complaintId = complaintId
        this.description = description
        this.contactId = contactId
        this.complaintType = complaintType
    }

    public isValid(): boolean {
        return !!this.contactId && this.description?.isValid() && this.complaintType.isValid()
    }
}