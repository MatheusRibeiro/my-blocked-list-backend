import Contact from './Contact'
import Complaint from './Complaint/Complaint'
import PhoneAccount from './ValueObjects/PhoneAccount'
import EmailAccount from './ValueObjects/EmailAccount'
import { assertIsComplaintDescription } from './Complaint/ValueObjects/ComplaintDescription'
import ComplaintType from './Complaint/ValueObjects/ComplaintType'
import Email from '@src/Domain/Base/ValueObject/Email'
import Phone from '@src/Domain/Base/ValueObject/Phone'
import PersonName from '@src/Domain/Base/ValueObject/PersonName'
import UUID from '@src/Domain/Base/ValueObject/UUID'

const phone = new Phone('+55 9876-5432')
const validPhone = new PhoneAccount(phone)

const email = new Email('email1@gmail.com')
const validEmail = new EmailAccount(email)

const validPersonName = new PersonName({ firstName: 'John', lastName: 'Doe' })
const validUuid = UUID.generate()

const validDescription = 'valid description'
assertIsComplaintDescription(validDescription)

const complaintAuthorId = UUID.generate()
const validComplaint = new Complaint(
    UUID.generate(),
    validDescription,
    new ComplaintType({ complaintCategory: 'OTHER', complaintSeverity: 'CRITICAL' }),
    complaintAuthorId
)

describe('get Id', () => {
    test('should return the contact id', () => {
        const contact = new Contact(validUuid, validPersonName, validPhone, [validComplaint])

        expect(contact.getId()).toBe(validUuid)
    })
})

describe('Is Valid', () => {
    test('is valid with phone as contact', () => {
        const contact = new Contact(validUuid, validPersonName, validPhone, [validComplaint])

        expect(contact.isValid()).toBeTruthy()
    })

    test('is valid with email as contact', () => {
        const contact = new Contact(validUuid, validPersonName, validEmail, [validComplaint])

        expect(contact.isValid()).toBeTruthy()
    })
})

describe('validate', () => {
    test('returns an empty result when valid', () => {
        const contact = new Contact(validUuid, validPersonName, validPhone, [validComplaint])

        expect(contact.validate()).toBeNull()
    })
})

describe('is Equal', () => {
    test('should be equal when have the same id', () => {
        const initId = UUID.generate()
        const copyId = initId

        const contact1 = new Contact(initId, new PersonName({ firstName: 'John', lastName: '' }), validPhone, [
            validComplaint,
        ])
        const contact2 = new Contact(copyId, new PersonName({ firstName: 'Mary', lastName: '' }), validEmail, [
            validComplaint,
        ])

        expect(contact1.isEqual(contact2)).toBeTruthy()
    })

    test('should not be equal when have different ids', () => {
        const id1 = UUID.generate()
        const id2 = UUID.generate()

        const contact1 = new Contact(id1, new PersonName({ firstName: 'John', lastName: '' }), validPhone, [
            validComplaint,
        ])
        const contact2 = new Contact(id2, new PersonName({ firstName: 'John', lastName: '' }), validPhone, [
            validComplaint,
        ])

        expect(contact1.isEqual(contact2)).toBeFalsy()
    })
})

describe('Remove complaint', () => {
    it('should return the removed complaint', () => {
        const contact = new Contact(validUuid, validPersonName, validPhone, [validComplaint])
        const removedComplaint = contact.removeComplaint(validComplaint.getId(), complaintAuthorId)
        expect(removedComplaint === null).toBeFalsy()
        expect(validComplaint.isEqual(removedComplaint as Complaint))
        expect(contact.getComplaints().length).toBe(0)
    })
    it('should return null if the complaint was not found complaint', () => {
        const contact = new Contact(validUuid, validPersonName, validPhone, [validComplaint])
        const removedComplaint = contact.removeComplaint(UUID.generate(), complaintAuthorId)
        expect(removedComplaint).toBeNull()
        expect(contact.getComplaints().length).toBe(1)
    })
    it('should return null if the complaint was not from who is trying to remove it', () => {
        const contact = new Contact(validUuid, validPersonName, validPhone, [validComplaint])
        const removedComplaint = contact.removeComplaint(validComplaint.getId(), UUID.generate())
        expect(removedComplaint).toBeNull()
        expect(contact.getComplaints().length).toBe(1)
    })
})
