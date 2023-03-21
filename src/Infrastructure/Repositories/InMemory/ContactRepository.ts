import IContactRepository from '@src/Domain/Aggregates/Contact/IContactRepository'
import Contact from '@src/Domain/Aggregates/Contact/Contact'
import ContactId from '@src/Domain/Aggregates/Contact/ValueObjects/ContactId'
import InMemoryRepository from './InMemoryRepository'
import Phone from '@src/Domain/Base/ValueObject/Phone'
import Email from '@src/Domain/Base/ValueObject/Email'
import PhoneAccount from '@src/Domain/Aggregates/Contact/ValueObjects/PhoneAccount'
import EmailAccount from '@src/Domain/Aggregates/Contact/ValueObjects/EmailAccount'
import dbContext from './DbContext'

export default class ContactInMemoryRepository
    extends InMemoryRepository<Contact, ContactId>
    implements IContactRepository
{
    public async findByPhone(phone: Phone): Promise<Contact | null> {
        const phoneAccount = new PhoneAccount(phone)
        for (let i = 0; i < dbContext[this.tableName].length; i++) {
            if ((dbContext[this.tableName][i] as Contact).account.isEqual(phoneAccount)) {
                return dbContext[this.tableName][i] as Contact
            }
        }
        return null
    }

    public async findByEmail(email: Email): Promise<Contact | null> {
        const emailAccount = new EmailAccount(email)
        for (let i = 0; i < dbContext[this.tableName].length; i++) {
            if ((dbContext[this.tableName][i] as Contact).account.isEqual(emailAccount)) {
                return dbContext[this.tableName][i] as Contact
            }
        }
        return null
    }
}
