import { uuidFactory } from '@src/Domain/Base/Types/UUID'
import Complaint from './Complaint'
import ComplaintDescription from './ValueObjects/ComplaintDescription'
import ComplaintType from './ValueObjects/ComplaintType'

const complaintType = new ComplaintType({
    complaintCategory: 'SPAM',
    complaintSeverity: 'ALERT',
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

        expect(complaint.getId()).toBe(validComplaintId)
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
})

describe('is Equal', () => {
    test('should be equal when have the same id', () => {
        const id = uuidFactory()
        const sameId = id

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
