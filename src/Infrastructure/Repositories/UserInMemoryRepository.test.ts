import User from '@src/Domain/Aggregates/User/User'
import Password from '@src/Domain/Aggregates/User/ValueObjects/Password'
import UserId from '@src/Domain/Aggregates/User/ValueObjects/UserId'
import Username from '@src/Domain/Aggregates/User/ValueObjects/Username'
import { uuidFactory } from '@src/Domain/Base/ValueObject/UUID'
import UserInMemoryRepository from './UserInMemoryRepository'

describe('User In Memory Repository', () => {
    const repo = new UserInMemoryRepository()

    const firstUser = new User(new UserId(uuidFactory().value), new Username('username'), new Password('1234'))
    test('create', async () => {
        await repo.create(firstUser)
        const total = await repo.count()
        expect(total).toBe(1)
    })

    test('find by id', async () => {
        const found = await repo.findById(firstUser.userId)
        expect(found?.isEqual(firstUser)).toBeTruthy()
    })

    test('find by username', async () => {
        const found = await repo.findByUsername(firstUser.username)
        expect(found?.isEqual(firstUser)).toBeTruthy()
    })

    test('update', async () => {
        const newUsername = 'othername'
        firstUser.username = new Username(newUsername)
        await repo.update(firstUser)
        const found = await repo.findById(firstUser.userId)
        expect(found?.username.value).toBe(newUsername)
    })

    test('delete', async () => {
        await repo.delete(firstUser)
        const total = await repo.count()
        expect(total).toBe(0)
    })
})
