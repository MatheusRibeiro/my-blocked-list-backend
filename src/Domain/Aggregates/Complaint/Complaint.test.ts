import UUID from "../../Base/ValueObject/UUID"
import Complaint from "./Complaint"
import ComplaintDescription from "./ValueObjects/ComplaintDescription"
import ComplaintType, { ComplaintCategory, ComplaintSeverity } from "./ValueObjects/ComplaintType"

const complaintType = new ComplaintType({
    complaintCategory: ComplaintCategory.SPAM,
    complaintSeverity: ComplaintSeverity.ALERT
})

const validContactId = UUID.generate()
const validAuthorId = UUID.generate()
const validComplaintId = UUID.generate()

describe('Is Valid', () => {
    test('is valid with all fields', () => {
        const complaint = new Complaint(
            validComplaintId,
            new ComplaintDescription('12345'),
            validContactId,
            complaintType,
            validAuthorId
        )


        expect(complaint.isValid()).toBeTruthy()
    })
    test('is not valid with description shorter than 5 characters', () => {
        const complaint = new Complaint(
            validComplaintId,
            new ComplaintDescription('1234'),
            validContactId,
            complaintType,
            validAuthorId
        )

        expect(complaint.isValid()).toBeFalsy()
    })
    test('is not valid with a description longer than 255 characters', () => {
        const complaint = new Complaint(
            validComplaintId,
            new ComplaintDescription('a'.repeat(256)),
            validContactId,
            complaintType,
            validAuthorId
        )

        expect(complaint.isValid()).toBeFalsy()
    })
    test('is not valid with invalid Complaint Type', () => {
        const invalidComplaintType = new ComplaintType({
            complaintCategory: ComplaintCategory.HOAX,
            complaintSeverity: 6
        })
        const complaint = new Complaint(
            validComplaintId,
            new ComplaintDescription('description'),
            validContactId,
            invalidComplaintType,
            validAuthorId
        )

        expect(complaint.isValid()).toBeFalsy()
    })
})