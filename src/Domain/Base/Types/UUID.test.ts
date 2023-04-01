import BadRequestError from '@src/Domain/Errors/BadRequestError'
import { assertIsUUID, isUUID } from './UUID'

const validUUID = 'd4859d67-f273-4e67-a251-3b6f085e3257'

describe('UUID type', () => {
    test('isUUID returns true when valid', () => {
        const uuid = validUUID
        const check = isUUID(uuid)
        expect(check).toBeTruthy()
    })
    test('isUUID returns false when invalid', () => {
        const uuid = 'invalid'
        expect(isUUID(uuid)).toBeFalsy()
    })
    test('assertIsUUID does not throw error when valid', () => {
        const uuid = validUUID
        assertIsUUID(uuid)
        expect(uuid).toBe(validUUID)
    })

    test('assertIsUUID throws error when invalid', () => {
        const uuid = 'invalid'
        const assert = (): void => assertIsUUID(uuid)
        expect(assert).toThrow(BadRequestError)
    })
})
