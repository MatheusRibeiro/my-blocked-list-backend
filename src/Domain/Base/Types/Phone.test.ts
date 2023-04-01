import BadRequestError from '@src/Domain/Errors/BadRequestError'
import Phone, { assertIsPhone, isPhone } from './Phone'

const validPhone = '+55 9876-5432'

describe('Phone type', () => {
    test('isPhone returns true when valid', () => {
        const phone = validPhone as Phone
        const check = isPhone(phone)
        expect(check).toBeTruthy()
    })
    test('isPhone returns false when invalid', () => {
        const phone = 'invalid'
        expect(isPhone(phone)).toBeFalsy()
    })
    test('assertIsPhone does not throw error when valid', () => {
        const phone = validPhone
        assertIsPhone(phone)
        expect(phone).toBe(validPhone)
    })

    test('assertIsPhone throws error when invalid', () => {
        const phone = 'invalid'
        const assert = (): void => assertIsPhone(phone)
        expect(assert).toThrow(BadRequestError)
    })
})
