import UUID from './UUID'

const validUUID1 = 'd4859d67-f273-4e67-a251-3b6f085e3257'
const validUUID2 = '4432d0ca-6c48-424d-a6b8-9f81de0b60ef'

describe('UUID Value Object', () => {
    test('UUID is valid', () => {
        const uuid = new UUID(validUUID1)
        expect(uuid.isValid()).toBeTruthy()
    })
    test('UUID invalid', () => {
        const uuid = new UUID('invalid')
        expect(uuid.isValid()).toBeFalsy()
    })
    test('UUID is equal', () => {
        const uuid1 = new UUID(validUUID1)
        const uuid2 = new UUID(validUUID1)
        expect(uuid1.isEqual(uuid2)).toBeTruthy()
    })
    test('UUID is not equal', () => {
        const uuid1 = new UUID(validUUID1)
        const uuid2 = new UUID(validUUID2)
        expect(uuid1.isEqual(uuid2)).toBeFalsy()
    })
})
