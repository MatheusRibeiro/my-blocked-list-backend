import Contact from './Contact'
import Complaint from './Complaint/Complaint'
import PhoneAccount from './ValueObjects/PhoneAccount'
import EmailAccount from './ValueObjects/EmailAccount'
import ComplaintDescription from './Complaint/ValueObjects/ComplaintDescription'
import ComplaintType from './Complaint/ValueObjects/ComplaintType'
import { assertIsEmail } from '@src/Domain/Base/Types/Email'
import { assertIsPhone } from '@src/Domain/Base/Types/Phone'
import PersonName from '@src/Domain/Base/ValueObject/PersonName'
import { uuidFactory } from '@src/Domain/Base/Types/UUID'

const phone = '+55 9876-5432'
assertIsPhone(phone)
const validPhone = new PhoneAccount(phone)

const email = 'email1@gmail.com'
assertIsEmail(email)
const validEmail = new EmailAccount(email)
const validPersonName = new PersonName({ firstName: 'John', lastName: 'Doe' })
const validUuid = uuidFactory()

const validComplaint = new Complaint(
    uuidFactory(),
    new ComplaintDescription('valid description'),
    new ComplaintType({ complaintCategory: 2, complaintSeverity: 3 }),
    uuidFactory()
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
        const initId = uuidFactory()
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
        const id1 = uuidFactory()
        const id2 = uuidFactory()

        const contact1 = new Contact(id1, new PersonName({ firstName: 'John', lastName: '' }), validPhone, [
            validComplaint,
        ])
        const contact2 = new Contact(id2, new PersonName({ firstName: 'John', lastName: '' }), validPhone, [
            validComplaint,
        ])

        expect(contact1.isEqual(contact2)).toBeFalsy()
    })
})
