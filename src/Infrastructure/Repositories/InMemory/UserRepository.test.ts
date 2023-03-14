import User from '@src/Domain/Aggregates/User/User'
import Password from '@src/Domain/Aggregates/User/ValueObjects/Password'
import UserId from '@src/Domain/Aggregates/User/ValueObjects/UserId'
import Username from '@src/Domain/Aggregates/User/ValueObjects/Username'
import { uuidFactory } from '@src/Domain/Base/ValueObject/UUID'
import UserInMemoryRepository from './UserRepository'

describe('User In Memory Repository', () => {
    const repo = new UserInMemoryRepository()

    const firstUser = new User(new UserId(uuidFactory().value), new Username('username'), new Password('1234'))
    const anotherUser = new User(new UserId(uuidFactory().value), new Username('username2'), new Password('4321'))

    test('create', async () => {
        await repo.create(firstUser)
        const total = await repo.count()
        expect(total).toBe(1)
    })

    test('find by id', async () => {
        const found = await repo.findById(firstUser.userId)
        expect(found?.isEqual(firstUser)).toBeTruthy()
    })

    test('not found by id', async () => {
        const notFound = await repo.findById(uuidFactory())
        expect(notFound).toBeNull()
    })

    test('find by username', async () => {
        const found = await repo.findByUsername(firstUser.username)
        expect(found?.isEqual(firstUser)).toBeTruthy()
    })

    test('not found by username', async () => {
        const notFound = await repo.findByUsername(anotherUser.username)
        expect(notFound).toBeNull()
    })

    test('update', async () => {
        const newUsername = 'othername'
        firstUser.username = new Username(newUsername)
        const result = await repo.update(firstUser)
        const found = await repo.findById(firstUser.userId)

        expect(result).toBeNull()
        expect(found?.username.value).toBe(newUsername)
    })

    test('update inexistent user', async () => {
        const newUsername = 'othername'
        anotherUser.username = new Username(newUsername)
        const result = await repo.update(anotherUser)
        expect(result).toBeNull()
    })

    test('delete', async () => {
        await repo.delete(firstUser)
        const total = await repo.count()
        expect(total).toBe(0)
    })
})
