import UUID from '@src/Domain/Base/ValueObject/UUID'
import Complaint from './Complaint'
import { assertIsComplaintDescription } from './ValueObjects/ComplaintDescription'
import ComplaintType from './ValueObjects/ComplaintType'

const complaintType = new ComplaintType({
    complaintCategory: 'SPAM',
    complaintSeverity: 'ALERT',
})

const validAuthorId = UUID.generate()
const validComplaintId = UUID.generate()
const validDescription = 'valid description'
assertIsComplaintDescription(validDescription)

describe('get Id', () => {
    test('should return the complaintId', () => {
        const complaint = new Complaint(validComplaintId, validDescription, complaintType, validAuthorId)

        expect(complaint.getId()).toBe(validComplaintId)
    })
})

describe('Is Valid', () => {
    test('is valid with all fields', () => {
        const complaint = new Complaint(validComplaintId, validDescription, complaintType, validAuthorId)

        expect(complaint.isValid()).toBeTruthy()
    })
})

describe('is Equal', () => {
    test('should be equal when have the same id', () => {
        const id = UUID.generate()
        const sameId = id

        const complaint = new Complaint(id, validDescription, complaintType, UUID.generate())

        const anotherValidDescription = 'another valid description'
        assertIsComplaintDescription(anotherValidDescription)
        const differentComplaint = new Complaint(sameId, anotherValidDescription, complaintType, UUID.generate())

        expect(complaint.isEqual(differentComplaint)).toBeTruthy()
    })
    test('should not be equal when have different ids', () => {
        const id = UUID.generate()
        const anotherId = UUID.generate()

        const complaint = new Complaint(id, validDescription, complaintType, validAuthorId)

        const sameIdComplaint = new Complaint(anotherId, validDescription, complaintType, validAuthorId)
        expect(complaint.isEqual(sameIdComplaint)).toBeFalsy()
    })
})
