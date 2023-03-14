import UUID, { uuidFactory } from '../../Base/ValueObject/UUID'
import User from './User'
import Password from './ValueObjects/Password'
import Username from './ValueObjects/Username'

const validUuid = uuidFactory()
const validUsername = new Username('my_username')
const validPassword = new Password('1234')

describe('get Id', () => {
    test('should return the userId', () => {
        const user = new User(validUuid, validUsername, validPassword)

        expect(user.getId().isEqual(validUuid)).toBeTruthy()
    })
})

describe('is valid', () => {
    test('is valid when all required fields are filled', () => {
        const user = new User(validUuid, validUsername, validPassword)

        expect(user.isValid()).toBeTruthy()
    })
    test('is not valid with invalid username', () => {
        const user = new User(validUuid, new Username(''), validPassword)

        expect(user.isValid()).toBeFalsy()
    })
    test('is not valid with invalid password', () => {
        const user = new User(validUuid, validUsername, new Password(''))

        expect(user.isValid()).toBeFalsy()
    })
})

describe('is Equal', () => {
    test('should be equal when have the same id', () => {
        const id = uuidFactory()
        const sameId = new UUID(id.value)

        const user = new User(id, new Username('first_one'), new Password('1234'))
        const sameIdUser = new User(sameId, new Username('second_one'), new Password('5678'))

        expect(user.isEqual(sameIdUser)).toBeTruthy()
    })

    test('should not be equal when have different ids', () => {
        const id = uuidFactory()
        const anotherId = uuidFactory()

        const user = new User(id, validUsername, validPassword)
        const differentUser = new User(anotherId, validUsername, validPassword)

        expect(user.isEqual(differentUser)).toBeFalsy()
    })
})
