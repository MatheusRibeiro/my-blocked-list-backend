import Entity from "../../Base/Entity";
import ComplaintDescription from "./ValueObjects/ComplaintDescription";
import ComplaintType from "./ValueObjects/ComplaintType";

export default class Complaint extends Entity {
    public readonly complaintId: string
    public readonly description: ComplaintDescription
    public readonly contactId: string
    public readonly complaintType: ComplaintType

    constructor(
        complaintId: string,
        description: ComplaintDescription,
        contactId: string,
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