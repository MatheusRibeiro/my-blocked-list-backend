import Complaint from './Complaint'
import UUID, { uuidFactory } from '@src/Domain/Base/ValueObject/UUID'
import ComplaintDescription from './ValueObjects/ComplaintDescription'
import ComplaintType from './ValueObjects/ComplaintType'
import UserId from '@src/Domain/Aggregates/User/ValueObjects/UserId'

export interface RawComplaintDataWithoutId {
    description: string
    category: number
    severity: number
    authorId: UserId
}

export interface RawComplaintDataWithId extends RawComplaintDataWithoutId {
    complaintId: UUID
}

export function complaintFactoryWithoutId(rawData: RawComplaintDataWithoutId): Complaint {
    const complaintId = uuidFactory()
    return complaintFactoryWithId(Object.assign({ complaintId }, rawData))
}

export function complaintFactoryWithId({
    complaintId,
    description,
    category,
    severity,
    authorId,
}: RawComplaintDataWithId): Complaint {
    return new Complaint(
        complaintId,
        new ComplaintDescription(description),
        new ComplaintType({ complaintCategory: category, complaintSeverity: severity }),
        authorId
    )
}
