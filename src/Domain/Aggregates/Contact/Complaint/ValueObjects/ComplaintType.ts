import ValueObject from '@src/Domain/Base/Abstractions/ValueObject'
import BadRequestError from '@src/Domain/Errors/BadRequestError'

const categories = ['SPAM', 'HOAX', 'SCAM', 'OTHER'] as const
const severities = ['INFO', 'NOTICE', 'WARNING', 'CRITICAL', 'ALERT'] as const

export type ComplaintCategory = (typeof categories)[number]
export type ComplaintSeverity = (typeof severities)[number]

const invalidCategoryMessage = `Invalid value for complaint category. The accepted values are ${categories.join(', ')}`
const invalidSeverityMessage = `Invalid value for complaint severity. The accepted values are ${severities.join(', ')}`

interface IComplaintType {
    complaintCategory: ComplaintCategory
    complaintSeverity: ComplaintSeverity
}

interface ComplaintTypeJSON {
    category: string
    severity: string
}

export function isComplaintCategory(value: string): value is ComplaintCategory {
    return categories.includes(value as ComplaintCategory)
}
export function assertIsComplaintCategory(value: string): asserts value is ComplaintCategory {
    if (!isComplaintCategory(value)) {
        throw new BadRequestError(invalidCategoryMessage)
    }
}

export function isComplaintSeverity(value: string): value is ComplaintSeverity {
    return severities.includes(value as ComplaintSeverity)
}
export function assertIsComplaintSeverity(value: string): asserts value is ComplaintSeverity {
    if (!isComplaintSeverity(value)) {
        throw new BadRequestError(invalidSeverityMessage)
    }
}

export default class ComplaintType extends ValueObject<IComplaintType> {
    public isValid(): boolean {
        const { complaintCategory, complaintSeverity } = this.value
        return complaintCategory !== undefined && complaintSeverity !== undefined
    }

    public toJSON(): ComplaintTypeJSON {
        const { complaintCategory, complaintSeverity } = this.value
        return {
            category: complaintCategory,
            severity: complaintSeverity,
        }
    }
}
