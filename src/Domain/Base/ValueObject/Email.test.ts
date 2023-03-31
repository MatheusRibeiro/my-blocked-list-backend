import BadRequestError from '@src/Domain/Errors/BadRequestError'
import Email from './Email'

const validEmail1 = 'email1@gmail.com'
const validEmail2 = 'email2@gmail.com'

describe('Email Value Object', () => {
    test('email is valid', () => {
        const email = new Email(validEmail1)
        expect(email.isValid()).toBeTruthy()
    })
    test('email is invalid', () => {
        const newEmail = (): Email => new Email('invalid')
        expect(newEmail).toThrow(BadRequestError)
    })
    test('email is equal', () => {
        const email1 = new Email(validEmail1)
        const email2 = new Email(validEmail1)
        expect(email1.isEqual(email2)).toBeTruthy()
    })
    test('email is not equal', () => {
        const email1 = new Email(validEmail1)
        const email2 = new Email(validEmail2)
        expect(email1.isEqual(email2)).toBeFalsy()
    })
})
