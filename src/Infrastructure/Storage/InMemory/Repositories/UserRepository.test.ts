import User from '@src/Domain/Aggregates/User/User'
import Password from '@src/Domain/Aggregates/User/ValueObjects/Password'
import Username from '@src/Domain/Aggregates/User/ValueObjects/Username'
import UUID from '@src/Domain/Base/ValueObject/UUID'
import UserInMemoryRepository from './UserRepository'
import { DEFAULT_USER_ROLE } from '@src/Domain/Aggregates/User/ValueObjects/UserRole'

describe('User In Memory Repository', () => {
    const repo = new UserInMemoryRepository()

    const firstUser = new User(UUID.generate(), new Username('username'), DEFAULT_USER_ROLE, new Password('1234'))
    const anotherUser = new User(UUID.generate(), new Username('username2'), DEFAULT_USER_ROLE, new Password('4321'))

    test('create', async () => {
        await repo.create(firstUser)
        const total = await repo.count()
        expect(total).toBe(1)
    })

    test('find by id', async () => {
        const found = await repo.findById(firstUser.getId())
        expect(found?.isEqual(firstUser)).toBeTruthy()
    })

    test('not found by id', async () => {
        const notFound = await repo.findById(UUID.generate())
        expect(notFound).toBeNull()
    })

    test('find by username', async () => {
        const found = await repo.findByUsername(firstUser.getUsername())
        expect(found?.isEqual(firstUser)).toBeTruthy()
    })

    test('not found by username', async () => {
        const notFound = await repo.findByUsername(anotherUser.getUsername())
        expect(notFound).toBeNull()
    })

    test('update', async () => {
        const newUsername = 'othername'
        firstUser.setUsername(new Username(newUsername))
        const result = await repo.update(firstUser)
        const found = await repo.findById(firstUser.getId())

        expect(result).toBeNull()
        expect(found?.getUsername().getValue()).toBe(newUsername)
    })

    test('update inexistent user', async () => {
        const newUsername = 'othername'
        anotherUser.setUsername(new Username(newUsername))
        const result = await repo.update(anotherUser)
        expect(result).toBeNull()
    })

    test('delete', async () => {
        await repo.delete(firstUser)
        const total = await repo.count()
        expect(total).toBe(0)
    })
})
