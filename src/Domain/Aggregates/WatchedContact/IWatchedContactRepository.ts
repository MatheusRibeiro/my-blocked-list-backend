import IRepository from '@src/Domain/Base/Abstractions/Repository'
import WatchedContact from './WatchedContact'
import WatchedContactId from './ValueObjects/WatchedContactId'
import Email from '@src/Domain/Base/ValueObject/Email'
import Phone from '@src/Domain/Base/ValueObject/Phone'

export default interface IWatchedContactRepository extends IRepository<WatchedContact, WatchedContactId> {
    findByPhone: (phone: Phone) => Promise<WatchedContact | null>
    findByEmail: (email: Email) => Promise<WatchedContact | null>
}
