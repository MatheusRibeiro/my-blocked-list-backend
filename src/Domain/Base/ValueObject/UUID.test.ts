import BadRequestError from '@src/Domain/Errors/BadRequestError'
import UUID, { uuidFactory } from './UUID'

const validUuid1 = 'f22d6b94-bc16-4766-80c7-23063106fb2e'
const validUuid2 = '24a68eec-2d74-4422-a998-e9db57d303ad'

describe('UUID Value Object', () => {
    test('uuid is valid', () => {
        const uuid = new UUID(validUuid1)
        expect(uuid.isValid()).toBeTruthy()
    })
    test('uuid is invalid', () => {
        const newUuid = (): UUID => new UUID('invalid')
        expect(newUuid).toThrow(BadRequestError)
    })
    test('uuid is equal', () => {
        const uuid1 = new UUID(validUuid1)
        const uuid2 = new UUID(validUuid1)
        expect(uuid1.isEqual(uuid2)).toBeTruthy()
    })
    test('uuid is not equal', () => {
        const uuid1 = new UUID(validUuid1)
        const uuid2 = new UUID(validUuid2)
        expect(uuid1.isEqual(uuid2)).toBeFalsy()
    })
    test('generate a valid uuid', () => {
        const generated = uuidFactory()
        expect(generated.isValid()).toBeTruthy()
    })
})
