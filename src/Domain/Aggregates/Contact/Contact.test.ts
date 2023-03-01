import DomainError from "../../Base/DomainException"
import Contact from "./Contact"
import EmailAccount from "./ValueObjects/EmailAccount"
import PhoneAccount from "./ValueObjects/PhoneAccount"

const validPhone = '+55 9876-5432'
const validEmail = 'email@gmail.com'

test('phone is valid', () => {
    const phone = new PhoneAccount(validPhone)
    expect(phone.isValid()).toBeTruthy
})
test('phone is invalid', () => {
    const phone = new PhoneAccount('invalid')
    expect(phone.isValid()).toBeFalsy
})
test('phone is equal', () => {
    const phone1 = new PhoneAccount(validPhone)
    const phone2 = new PhoneAccount(validPhone)
    expect(phone1.isEqual(phone2)).toBeTruthy
})
test('email is valid', () => {
    const email = new EmailAccount(validEmail)
    expect(email.isValid()).toBeTruthy
})
test('phone is invalid', () => {
    const email = new EmailAccount('invalid')
    expect(email.isValid()).toBeFalsy
})
test('phone is equal', () => {
    const email1 = new EmailAccount(validEmail)
    const email2 = new EmailAccount(validEmail)
    expect(email1.isEqual(email2)).toBeTruthy
})

test('add multiple valid accounts contact', () => {
    const contact = new Contact("contact id", "contact name", "contact description")
    const email1 = new EmailAccount(validEmail)
    const email2 = new EmailAccount(`another${validEmail}`)
    const phone = new PhoneAccount(validPhone)
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
    const email1 = new EmailAccount(validEmail)
    const email2 = new EmailAccount(validEmail)
    contact.addAcount(email1)
    const methodCall = () => contact.addAcount(email2)

    expect(methodCall).toThrow(DomainError)
})
