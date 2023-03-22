import Complaint from './Complaint'
import ComplaintId from './ValueObjects/ComplaintId'
import { uuidFactory } from '@src/Domain/Base/ValueObject/UUID'
import ComplaintDescription from './ValueObjects/ComplaintDescription'
import ComplaintType from './ValueObjects/ComplaintType'
import UserId from '../../User/ValueObjects/UserId'

export interface RawComplaintDataWithoutId {
    description: string
    category: number
    severity: number
    authorId: string
}

export interface RawComplaintDataWithId extends RawComplaintDataWithoutId {
    complaintId: string
}

export function complaintFactoryWithoutId(rawData: RawComplaintDataWithoutId): Complaint {
    const complaintId = uuidFactory().value
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
        new ComplaintId(complaintId),
        new ComplaintDescription(description),
        new ComplaintType({ complaintCategory: category, complaintSeverity: severity }),
        new UserId(authorId)
    )
}
