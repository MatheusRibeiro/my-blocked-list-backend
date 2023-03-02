import ValueObject from "../../../Base/ValueObject/ValueObject"

export enum ComplaintCategory {
    SPAM,
    HOAX,
    SCAM,
    OTHER
}

export enum ComplaintSeverity {
    INFO = 1,
    NOTICE = 2,
    WARNING = 3,
    CRITICAL = 4,
    ALERT = 5
}

interface IComplaintType {
    complaintCategory: ComplaintCategory
    complaintSeverity: ComplaintSeverity
}

export default class ComplaintType extends ValueObject<IComplaintType> {
    public isValid(): boolean {
        return !!ComplaintCategory[this.value.complaintCategory] && !!ComplaintSeverity[this.value.complaintSeverity]
    }
}