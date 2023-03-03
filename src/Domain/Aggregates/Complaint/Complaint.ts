import Entity from "../../Base/Entity";
import ContactId from "../Contact/ValueObjects/ContactId";
import UserId from "../User/ValueObjects/UserId";
import ComplaintDescription from "./ValueObjects/ComplaintDescription";
import ComplaintId from "./ValueObjects/ComplaintId";
import ComplaintType from "./ValueObjects/ComplaintType";

export default class Complaint extends Entity {
    public readonly complaintId: ComplaintId
    public readonly description: ComplaintDescription
    public readonly contactId: ContactId
    public readonly complaintType: ComplaintType
    public readonly authorId: UserId

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

    public isValid(): boolean {
        return !!this.contactId && this.description?.isValid() && this.complaintType.isValid()
    }
}