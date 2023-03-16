import Contact from './Contact'
import Email from '../../Base/ValueObject/Email'
import Phone from '../../Base/ValueObject/Phone'
import PersonName from '../../Base/ValueObject/PersonName'
import UUID, { uuidFactory } from '../../Base/ValueObject/UUID'
import BadRequestError from '../../Errors/BadRequestError'

const validPhone = new Phone('+55 9876-5432')
const validEmail = new Email('email1@gmail.com')
const validPersonName = new PersonName({ firstName: 'John', lastName: 'Doe' })
const validUuid = uuidFactory()

describe('get Id', () => {
    test('should return the contact id', () => {
        const contact = new Contact(validUuid, validPersonName, validPhone)

        expect(contact.getId().isEqual(validUuid)).toBeTruthy()
    })
})

describe('Is Valid', () => {
    test('is valid with phone as contact', () => {
        const contact = new Contact(validUuid, validPersonName, validPhone)

        expect(contact.isValid()).toBeTruthy()
    })

    test('is valid with email as contact', () => {
        const contact = new Contact(validUuid, validPersonName, validEmail)

        expect(contact.isValid()).toBeTruthy()
    })

    test('is not valid with invalid phone as contact', () => {
        const invalidPhone = new Phone('invalid')
        const contact = new Contact(validUuid, validPersonName, invalidPhone)

        expect(contact.isValid()).toBeFalsy()
    })

    test('is not valid with invalid email as contact', () => {
        const invalidEmail = new Email('invalid')
        const contact = new Contact(validUuid, validPersonName, invalidEmail)

        expect(contact.isValid()).toBeFalsy()
    })
    test('is not valid with invalid person name', () => {
        const invalidPersonName = new PersonName({ firstName: '', lastName: 'Doe' })
        const contact = new Contact(validUuid, invalidPersonName, validPhone)

        expect(contact.isValid()).toBeFalsy()
    })
})

describe('validate', () => {
    test('returns an empty result when valid', () => {
        const contact = new Contact(validUuid, validPersonName, validPhone)

        expect(contact.validate()).toBeNull()
    })

    test('throws error when invalid', () => {
        const invalidPhone = new Phone('invalid')
        const contact = new Contact(validUuid, validPersonName, invalidPhone)

        expect(contact.validate).toThrow(BadRequestError)
    })
})

describe('is Equal', () => {
    test('should be equal when have the same id', () => {
        const initId = uuidFactory()
        const copyId = new UUID(initId.value)

        const contact1 = new Contact(initId, new PersonName({ firstName: 'John', lastName: '' }), validPhone)
        const contact2 = new Contact(copyId, new PersonName({ firstName: 'Mary', lastName: '' }), validEmail)

        expect(contact1.isEqual(contact2)).toBeTruthy()
    })

    test('should not be equal when have different ids', () => {
        const id1 = uuidFactory()
        const id2 = uuidFactory()

        const contact1 = new Contact(id1, new PersonName({ firstName: 'John', lastName: '' }), validPhone)
        const contact2 = new Contact(id2, new PersonName({ firstName: 'John', lastName: '' }), validPhone)

        expect(contact1.isEqual(contact2)).toBeFalsy()
    })
})
