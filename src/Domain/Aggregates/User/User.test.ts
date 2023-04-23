import UUID from '@src/Domain/Base/ValueObject/UUID'
import User from './User'
import Password from './ValueObjects/Password'
import Username from './ValueObjects/Username'
import { DEFAULT_USER_ROLE } from './ValueObjects/UserRole'

const validUuid = UUID.generate()
const validUsername = new Username('my_username')
const validPassword = new Password('123456')

describe('get Id', () => {
    test('should return the userId', () => {
        const user = new User(validUuid, validUsername, DEFAULT_USER_ROLE, validPassword)
        expect(user.getId()).toBe(validUuid)
    })
})

describe('is valid', () => {
    test('is valid when all required fields are filled', () => {
        const user = new User(validUuid, validUsername, DEFAULT_USER_ROLE, validPassword)

        expect(user.isValid()).toBeTruthy()
    })
    test('is not valid with invalid username', () => {
        const user = new User(validUuid, new Username(''), DEFAULT_USER_ROLE, validPassword)

        expect(user.isValid()).toBeFalsy()
    })
    test('is not valid with invalid password', () => {
        const user = new User(validUuid, validUsername, DEFAULT_USER_ROLE, new Password(''))

        expect(user.isValid()).toBeFalsy()
    })
})

describe('is Equal', () => {
    test('should be equal when have the same id', () => {
        const id = UUID.generate()
        const sameId = id

        const user = new User(id, new Username('first_one'), DEFAULT_USER_ROLE, new Password('1234'))
        const sameIdUser = new User(sameId, new Username('second_one'), DEFAULT_USER_ROLE, new Password('5678'))

        expect(user.isEqual(sameIdUser)).toBeTruthy()
    })

    test('should not be equal when have different ids', () => {
        const id = UUID.generate()
        const anotherId = UUID.generate()

        const user = new User(id, validUsername, DEFAULT_USER_ROLE, validPassword)
        const differentUser = new User(anotherId, validUsername, DEFAULT_USER_ROLE, validPassword)

        expect(user.isEqual(differentUser)).toBeFalsy()
    })
})
