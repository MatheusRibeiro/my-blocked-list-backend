import User from '../../Domain/Aggregates/User/User'
import UserId from '../../Domain/Aggregates/User/ValueObjects/UserId'
import InMemoryRepository from './InMemoryRepository'

export default class UserInMemoryRepository extends InMemoryRepository<User, UserId> { }
