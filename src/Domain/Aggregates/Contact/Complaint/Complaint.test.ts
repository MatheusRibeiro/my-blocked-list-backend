import UUID, { uuidFactory } from '@src/Domain/Base/ValueObject/UUID'
import Complaint from './Complaint'
import ComplaintDescription from './ValueObjects/ComplaintDescription'
import ComplaintType, { ComplaintCategory, ComplaintSeverity } from './ValueObjects/ComplaintType'

const complaintType = new ComplaintType({
    complaintCategory: ComplaintCategory.SPAM,
    complaintSeverity: ComplaintSeverity.ALERT,
})

const validAuthorId = uuidFactory()
const validComplaintId = uuidFactory()

describe('get Id', () => {
    test('should return the complaintId', () => {
        const complaint = new Complaint(
            validComplaintId,
            new ComplaintDescription('12345'),
            complaintType,
            validAuthorId
        )

        expect(complaint.getId().isEqual(validComplaintId)).toBeTruthy()
    })
})

describe('Is Valid', () => {
    test('is valid with all fields', () => {
        const complaint = new Complaint(
            validComplaintId,
            new ComplaintDescription('12345'),
            complaintType,
            validAuthorId
        )

        expect(complaint.isValid()).toBeTruthy()
    })
    test('is not valid with description shorter than 5 characters', () => {
        const complaint = new Complaint(
            validComplaintId,
            new ComplaintDescription('1234'),
            complaintType,
            validAuthorId
        )

        expect(complaint.isValid()).toBeFalsy()
    })
    test('is not valid with a description longer than 255 characters', () => {
        const complaint = new Complaint(
            validComplaintId,
            new ComplaintDescription('a'.repeat(256)),
            complaintType,
            validAuthorId
        )

        expect(complaint.isValid()).toBeFalsy()
    })
    test('is not valid with invalid Complaint Type', () => {
        const invalidComplaintType = new ComplaintType({
            complaintCategory: ComplaintCategory.HOAX,
            complaintSeverity: 6,
        })
        const complaint = new Complaint(
            validComplaintId,
            new ComplaintDescription('description'),
            invalidComplaintType,
            validAuthorId
        )

        expect(complaint.isValid()).toBeFalsy()
    })
})

describe('is Equal', () => {
    test('should be equal when have the same id', () => {
        const id = uuidFactory()
        const sameId = new UUID(id.value)

        const complaint = new Complaint(id, new ComplaintDescription('first'), complaintType, uuidFactory())

        const differentComplaint = new Complaint(
            sameId,
            new ComplaintDescription('second'),
            complaintType,
            uuidFactory()
        )
        expect(complaint.isEqual(differentComplaint)).toBeTruthy()
    })
    test('should not be equal when have different ids', () => {
        const id = uuidFactory()
        const anotherId = uuidFactory()

        const complaint = new Complaint(id, new ComplaintDescription('same'), complaintType, validAuthorId)

        const sameIdComplaint = new Complaint(anotherId, new ComplaintDescription('same'), complaintType, validAuthorId)
        expect(complaint.isEqual(sameIdComplaint)).toBeFalsy()
    })
})
