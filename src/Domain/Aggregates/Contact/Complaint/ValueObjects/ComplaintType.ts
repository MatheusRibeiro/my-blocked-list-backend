import ValueObject from '../../../../Base/AbstractValueObject'

export enum ComplaintCategory {
    SPAM,
    HOAX,
    SCAM,
    OTHER,
}

export enum ComplaintSeverity {
    INFO = 1,
    NOTICE = 2,
    WARNING = 3,
    CRITICAL = 4,
    ALERT = 5,
}

interface IComplaintType {
    complaintCategory: ComplaintCategory
    complaintSeverity: ComplaintSeverity
}

export default class ComplaintType extends ValueObject<IComplaintType> {
    public isValid(): boolean {
        const { complaintCategory, complaintSeverity } = this.value
        return ComplaintCategory[complaintCategory] !== undefined && ComplaintSeverity[complaintSeverity] !== undefined
    }

    public toJSON(): object {
        const { complaintCategory, complaintSeverity } = this.value
        return {
            category: ComplaintCategory[complaintCategory],
            severity: ComplaintSeverity[complaintSeverity],
        }
    }
}