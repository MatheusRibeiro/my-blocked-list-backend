import User from './User'
import UserId from './ValueObjects/UserId'
import Username from './ValueObjects/Username'
import IRepository from '@src/Domain/Base/AbstractRepository'

export default interface IUserRepository extends IRepository<User, UserId> {
    findByUsername: (username: Username) => Promise<User | null>
}
