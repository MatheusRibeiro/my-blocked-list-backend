import UUID from "../../Base/ValueObject/UUID"
import Complaint from "./Complaint"
import ComplaintDescription from "./ValueObjects/ComplaintDescription"
import ComplaintType, { ComplaintCategory, ComplaintSeverity } from "./ValueObjects/ComplaintType"

const complaintType = new ComplaintType({
    complaintCategory: ComplaintCategory.SPAM,
    complaintSeverity: ComplaintSeverity.ALERT

})

const validUuid = new UUID('f22d6b94-bc16-4766-80c7-23063106fb2e')
describe('Is Valid', () => {
    test('is valid with all fields', () => {
        const complaint = new Complaint(
            validUuid,
            new ComplaintDescription('12345'),
            validUuid,
            complaintType
        )


        expect(complaint.isValid()).toBeTruthy()
    })
    test('is not valid with description shorter than 5 characters', () => {
        const complaint = new Complaint(
            validUuid,
            new ComplaintDescription('1234'),
            validUuid,
            complaintType
        )

        expect(complaint.isValid()).toBeFalsy()
    })
    test('is not valid with a description longer than 255 characters', () => {
        const complaint = new Complaint(
            validUuid,
            new ComplaintDescription('a'.repeat(256)),
            validUuid,
            complaintType
        )

        expect(complaint.isValid()).toBeFalsy()
    })
    test('is not valid with invalid Complaint Type', () => {
        const invalidComplaintType = new ComplaintType({
            complaintCategory: ComplaintCategory.HOAX,
            complaintSeverity: 6
        })
        const complaint = new Complaint(
            validUuid,
            new ComplaintDescription('description'),
            validUuid,
            invalidComplaintType
        )

        expect(complaint.isValid()).toBeFalsy()
    })
})