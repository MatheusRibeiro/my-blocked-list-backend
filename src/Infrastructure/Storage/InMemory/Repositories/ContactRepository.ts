import IContactRepository from '@src/Domain/Aggregates/Contact/IContactRepository'
import Contact from '@src/Domain/Aggregates/Contact/Contact'
import ContactId from '@src/Domain/Aggregates/Contact/ValueObjects/ContactId'
import InMemoryRepository from '../Base/InMemoryRepository'
import Phone from '@src/Domain/Base/ValueObject/Phone'
import Email from '@src/Domain/Base/ValueObject/Email'
import dbContext from '../Base/DbContext'

export default class ContactInMemoryRepository
    extends InMemoryRepository<Contact, ContactId>
    implements IContactRepository
{
    public async findByPhone(phone: Phone): Promise<Contact | null> {
        for (let i = 0; i < dbContext[this.tableName].length; i++) {
            if ((dbContext[this.tableName][i] as Contact).getAccount().isEqual(phone)) {
                return dbContext[this.tableName][i] as Contact
            }
        }
        return null
    }

    public async findByEmail(email: Email): Promise<Contact | null> {
        for (let i = 0; i < dbContext[this.tableName].length; i++) {
            if ((dbContext[this.tableName][i] as Contact).getAccount().isEqual(email)) {
                return dbContext[this.tableName][i] as Contact
            }
        }
        return null
    }
}
