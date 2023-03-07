import DomainError from "../../Base/DomainException"
import Contact from "./Contact"
import Email from "../../Base/ValueObject/Email"
import Phone from "../../Base/ValueObject/Phone"
import PersonName from "../../Base/ValueObject/PersonName"
import UUID from "../../Base/ValueObject/UUID"

const validPhone = new Phone('+55 9876-5432')
const validEmail = new Email('email1@gmail.com')
const validPersonName = new PersonName({ firstName: "John", lastName: "Doe" })
const validUuid = new UUID()

describe('Is Valid', () => {

    test('add valid phone to contact', () => {
        const contact = new Contact(
            validUuid,
            validPersonName,
            'contact description',
            validPhone
        )

        expect(contact.isValid()).toBeTruthy()
    })

    test('add invalid email to contact', () => {
        const contact = new Contact(
            validUuid,
            validPersonName,
            'contact description',
            validEmail
        )

        expect(contact.isValid()).toBeTruthy()
    })

    test('add invalid phone to contact', () => {
        const phone = new Phone('invalid')

        const contact = new Contact(
            validUuid,
            validPersonName,
            'contact description',
            phone
        )

        expect(contact.isValid()).toBeFalsy()
    })

    test('add invalid email to contact', () => {
        const email = new Email('invalid')

        const contact = new Contact(
            validUuid,
            validPersonName,
            'contact description',
            email
        )

        expect(contact.isValid()).toBeFalsy()
    })

    test('is valid with an empty description', () => {
        const contact = new Contact(
            validUuid,
            validPersonName,
            '',
            validPhone
        )

        expect(contact.isValid()).toBeTruthy()
    })
    test('is not valid with invalid person name', () => {
        const contact = new Contact(
            validUuid,
            new PersonName({ firstName: "", lastName: "Doe" }),
            '',
            validPhone
        )

        expect(contact.isValid()).toBeFalsy()
    })
})

describe('is Equal', () => {
    test('should be equal when have the same id', () => {
        const id = new UUID()
        const sameId = new UUID(id.value)

        const contact = new Contact(
            id,
            new PersonName({ firstName: 'John', lastName: ''}),
            'first',
            validPhone
        )

        const sameIdContact = new Contact(
            sameId,
            new PersonName({ firstName: 'Mary', lastName: ''}),
            'second',
            validEmail
        )
        expect(contact.isEqual(sameIdContact)).toBeTruthy()
    })

    test('should not be equal when have different ids', () => {
        const id = new UUID()
        const anotherId = new UUID()

        const contact = new Contact(
            id,
            new PersonName({ firstName: 'John', lastName: ''}),
            'first',
            validPhone
        )

        const differentContact = new Contact(
            anotherId,
            new PersonName({ firstName: 'John', lastName: ''}),
            'first',
            validPhone
        )

        expect(contact.isEqual(differentContact)).toBeFalsy()
    })
})
