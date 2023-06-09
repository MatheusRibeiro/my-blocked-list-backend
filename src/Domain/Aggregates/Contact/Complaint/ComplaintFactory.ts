import Complaint from './Complaint'
import UUID from '@src/Domain/Base/ValueObject/UUID'
import { assertIsComplaintDescription } from './ValueObjects/ComplaintDescription'
import ComplaintType, { assertIsComplaintCategory, assertIsComplaintSeverity } from './ValueObjects/ComplaintType'
import UserId from '@src/Domain/Aggregates/User/ValueObjects/UserId'

export interface RawComplaintDataWithoutId {
    description: string
    category: string
    severity: string
    authorId: UserId
}

export interface RawComplaintDataWithId extends RawComplaintDataWithoutId {
    complaintId: UUID
}

export function complaintFactoryWithoutId(rawData: RawComplaintDataWithoutId): Complaint {
    const complaintId = UUID.generate()
    return complaintFactoryWithId(Object.assign({ complaintId }, rawData))
}

export function complaintFactoryWithId({
    complaintId,
    description,
    category,
    severity,
    authorId,
}: RawComplaintDataWithId): Complaint {
    assertIsComplaintCategory(category)
    assertIsComplaintSeverity(severity)
    assertIsComplaintDescription(description)

    return new Complaint(
        complaintId,
        description,
        new ComplaintType({
            complaintCategory: category,
            complaintSeverity: severity,
        }),
        authorId
    )
}
