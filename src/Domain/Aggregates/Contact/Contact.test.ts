import DomainError from "../../Base/DomainException"
import Contact from "./Contact"
import EmailAccount from "./ValueObjects/EmailAccount"
import PhoneAccount from "./ValueObjects/PhoneAccount"

const validPhone1 = '+55 9876-5432'
const validPhone2 = '+55 9123-4567'
const validEmail1 = 'email1@gmail.com'
const validEmail2 = 'email2@gmail.com'

describe('Phone Value Object', () => {
    test('phone is valid', () => {
        const phone = new PhoneAccount(validPhone1)
        expect(phone.isValid()).toBeTruthy
    })
    test('phone is invalid', () => {
        const phone = new PhoneAccount('invalid')
        expect(phone.isValid()).toBeFalsy
    })
    test('phone is equal', () => {
        const phone1 = new PhoneAccount(validPhone1)
        const phone2 = new PhoneAccount(validPhone1)
        expect(phone1.isEqual(phone2)).toBeTruthy
    })

    test('phone is not equal', () => {
        const phone1 = new PhoneAccount(validPhone1)
        const phone2 = new PhoneAccount(validPhone2)
        expect(phone1.isEqual(phone2)).toBeFalsy
    })
})

describe ('Email Value Object', () => {
    test('email is valid', () => {
        const email = new EmailAccount(validEmail1)
        expect(email.isValid()).toBeTruthy
    })
    test('email is invalid', () => {
        const email = new EmailAccount('invalid')
        expect(email.isValid()).toBeFalsy
    })
    test('email is equal', () => {
        const email1 = new EmailAccount(validEmail1)
        const email2 = new EmailAccount(validEmail1)
        expect(email1.isEqual(email2)).toBeTruthy
    })
    test('email is not equal', () => {
        const email1 = new EmailAccount(validEmail1)
        const email2 = new EmailAccount(validEmail2)
        expect(email1.isEqual(email2)).toBeTruthy
    })
})

describe('Add Account', () => {
    test('add valid accounts contact', () => {
        const contact = new Contact("contact id", "contact name", "contact description")
        const email1 = new EmailAccount(validEmail1)
        const email2 = new EmailAccount(validEmail2)
        const phone = new PhoneAccount(validPhone1)

        contact.addAcount(email1)
        contact.addAcount(email2)
        contact.addAcount(phone)
    
        expect(contact.accounts.length).toBe(3)
    })
    
    test('add invalid phone to contact', () => {
        const contact = new Contact("contact id", "contact name", "contact description")
        const phone = new PhoneAccount('invalid')
    
        const methodCall = () => contact.addAcount(phone)
        expect(methodCall).toThrow(Error)
    })
    
    test('add invalid email to contact', () => {
        const contact = new Contact("contact id", "contact name", "contact description")
        const email = new EmailAccount('invalid')

        const methodCall = () => contact.addAcount(email)
        expect(methodCall).toThrow(DomainError)
    })
    
    test('add duplicated account contact', () => {
        const contact = new Contact("contact id", "contact name", "contact description")
        const email1 = new EmailAccount(validEmail1)
        const email2 = new EmailAccount(validEmail1)

        contact.addAcount(email1)
        const methodCall = () => contact.addAcount(email2)
    
        expect(methodCall).toThrow(DomainError)
    })
    
})
