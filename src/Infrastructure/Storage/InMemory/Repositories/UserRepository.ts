import IUserRepository from '@src/Domain/Aggregates/User/IUserRepository'
import User from '@src/Domain/Aggregates/User/User'
import UserId from '@src/Domain/Aggregates/User/ValueObjects/UserId'
import Username from '@src/Domain/Aggregates/User/ValueObjects/Username'
import InMemoryRepository from './InMemoryRepository'
import dbContext from '../DbContext'

export default class UserInMemoryRepository extends InMemoryRepository<User, UserId> implements IUserRepository {
    public async findByUsername(username: Username): Promise<User | null> {
        for (let i = 0; i < dbContext[this.tableName].length; i++) {
            if ((dbContext[this.tableName][i] as User).username.isEqual(username)) {
                return dbContext[this.tableName][i] as User
            }
        }
        return null
    }
}
