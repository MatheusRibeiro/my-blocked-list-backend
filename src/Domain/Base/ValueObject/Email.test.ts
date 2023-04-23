import Email from './Email'

const validEmail1 = 'email@test.com'
const validEmail2 = 'another.email@test.com'

describe('Email Value Object', () => {
    test('Email is valid', () => {
        const email = new Email(validEmail1)
        expect(email.isValid()).toBeTruthy()
    })
    test('Email invalid', () => {
        const email = new Email('invalid')
        expect(email.isValid()).toBeFalsy()
    })
    test('Email is equal', () => {
        const email1 = new Email(validEmail1)
        const email2 = new Email(validEmail1)
        expect(email1.isEqual(email2)).toBeTruthy()
    })
    test('Email is not equal', () => {
        const email1 = new Email(validEmail1)
        const email2 = new Email(validEmail2)
        expect(email1.isEqual(email2)).toBeFalsy()
    })
})
