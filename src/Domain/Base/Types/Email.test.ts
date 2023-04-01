import BadRequestError from '@src/Domain/Errors/BadRequestError'
import Email, { assertIsEmail, isEmail } from './Email'

const validEmail = 'mail@test.com'

describe('Email type', () => {
    test('isEmail returns true and cast string into email type when valid', () => {
        const email = validEmail as Email
        const check = isEmail(email)
        expect(check).toBeTruthy()
    })
    test('isEmail returns false and does not cast', () => {
        const email = 'invalid'
        expect(isEmail(email)).toBeFalsy()
    })
    test('assertIsEmail should not throw error when valid', () => {
        const email = validEmail
        assertIsEmail(email)
        expect(email).toBe(validEmail)
    })

    test('assertIsEmail throws error when invalid', () => {
        const email = 'invalid'
        const assert = (): void => assertIsEmail(email)
        expect(assert).toThrow(BadRequestError)
    })
})
