import UUID from "../../Base/ValueObject/UUID"
import User from "./User"
import Password from "./ValueObjects/Password"
import Username from "./ValueObjects/Username"

const validUuid = UUID.generate()
const validUsername = new Username('my_username')
const validPassword = new Password('1234')

describe('is valid', () => {
    test('is valid when all required fields are filled', () => {
        const user = new User(
            validUuid,
            validUsername,
            validPassword
        )

        expect(user.isValid()).toBeTruthy()
    })
    test('is not valid with invalid username', () => {
        const user = new User(
            validUuid,
            new Username(''),
            validPassword
        )

        expect(user.isValid()).toBeFalsy()
    })
    test('is not valid with invalid password', () => {
        const user = new User(
            validUuid,
            validUsername,
            new Password('')
        )

        expect(user.isValid()).toBeFalsy()
    })
})