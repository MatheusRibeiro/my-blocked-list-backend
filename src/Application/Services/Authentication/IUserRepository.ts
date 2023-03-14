import User from '../../../Domain/Aggregates/User/User'
import UserId from '../../../Domain/Aggregates/User/ValueObjects/UserId'
import Username from '../../../Domain/Aggregates/User/ValueObjects/Username'

export default interface IUserRepository {
    create: (user: User) => Promise<void>
    findById: (userId: UserId) => Promise<User | null>
    findByUsername: (username: Username) => Promise<User | null>
}
