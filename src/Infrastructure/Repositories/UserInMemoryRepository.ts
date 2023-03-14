import IUserRepository from '@src/Application/Services/Authentication/IUserRepository'
import User from '@src/Domain/Aggregates/User/User'
import UserId from '@src/Domain/Aggregates/User/ValueObjects/UserId'
import Username from '@src/Domain/Aggregates/User/ValueObjects/Username'
import InMemoryRepository from './InMemoryRepository'

export default class UserInMemoryRepository extends InMemoryRepository<User, UserId> implements IUserRepository {
    public async findByUsername(username: Username): Promise<User | null> {
        for (let i = 0; i < this.storage.length; i++) {
            if (this.storage[i].username.isEqual(username)) {
                return this.storage[i]
            }
        }
        return null
    }
}
