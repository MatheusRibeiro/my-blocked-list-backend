import Complaint from "./Complaint"
import ComplaintDescription from "./ValueObjects/ComplaintDescription"
import ComplaintType, { ComplaintCategory, ComplaintSeverity } from "./ValueObjects/ComplaintType"

const complaintType = new ComplaintType({
    complaintCategory: ComplaintCategory.SPAM,
    complaintSeverity: ComplaintSeverity.ALERT

})
describe('Is Valid', () => {
    test('is valid with all fields', () => {
        const complaint = new Complaint(
            'complaint id',
            new ComplaintDescription('12345'),
            'contact Id',
            complaintType
        )


        expect(complaint.isValid()).toBeTruthy()
    })
    test('is not valid with description shorter than 5 characters', () => {
        const complaint = new Complaint(
            'complaint id',
            new ComplaintDescription('1234'),
            'contact id',
            complaintType
        )

        expect(complaint.isValid()).toBeFalsy()
    })
    test('is not valid with a description longer than 255 characters', () => {
        const complaint = new Complaint(
            'complaint id',
            new ComplaintDescription('a'.repeat(256)),
            'contact id',
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
            'complaint id',
            new ComplaintDescription('description'),
            'contact id',
            invalidComplaintType
        )

        expect(complaint.isValid()).toBeFalsy()
    })
})