import IWatchedContactRepository from '@src/Domain/Aggregates/WatchedContact/IWatchedContactRepository'
import WatchedContact from '@src/Domain/Aggregates/WatchedContact/WatchedContact'
import WatchedContactId from '@src/Domain/Aggregates/WatchedContact/ValueObjects/WatchedContactId'
import InMemoryRepository from '../Base/InMemoryRepository'
import Phone from '@src/Domain/Base/Types/Phone'
import Email from '@src/Domain/Base/Types/Email'
import PhoneAccount from '@src/Domain/Aggregates/WatchedContact/ValueObjects/PhoneAccount'
import EmailAccount from '@src/Domain/Aggregates/WatchedContact/ValueObjects/EmailAccount'
import dbContext from '../Base/DbContext'

export default class WatchedContactInMemoryRepository
    extends InMemoryRepository<WatchedContact, WatchedContactId>
    implements IWatchedContactRepository
{
    public async findByPhone(phone: Phone): Promise<WatchedContact | null> {
        const phoneAccount = new PhoneAccount(phone)
        for (let i = 0; i < dbContext[this.tableName].length; i++) {
            if ((dbContext[this.tableName][i] as WatchedContact).contactAccount.isEqual(phoneAccount)) {
                return dbContext[this.tableName][i] as WatchedContact
            }
        }
        return null
    }

    public async findByEmail(email: Email): Promise<WatchedContact | null> {
        const emailAccount = new EmailAccount(email)
        for (let i = 0; i < dbContext[this.tableName].length; i++) {
            if ((dbContext[this.tableName][i] as WatchedContact).contactAccount.isEqual(emailAccount)) {
                return dbContext[this.tableName][i] as WatchedContact
            }
        }
        return null
    }
}
