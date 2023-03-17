import IContactRepository from '@src/Domain/Aggregates/Contact/IContactRepository'
import Contact from '@src/Domain/Aggregates/Contact/Contact'
import ContactId from '@src/Domain/Aggregates/Contact/ValueObjects/ContactId'
import InMemoryRepository from './InMemoryRepository'
import Phone from '@src/Domain/Base/ValueObject/Phone'
import Email from '@src/Domain/Base/ValueObject/Email'
import PhoneAccount from '@src/Domain/Aggregates/Contact/ValueObjects/PhoneAccount'
import EmailAccount from '@src/Domain/Aggregates/Contact/ValueObjects/EmailAccount'

export default class ContactInMemoryRepository
    extends InMemoryRepository<Contact, ContactId>
    implements IContactRepository
{
    public async findByPhone(phone: Phone): Promise<Contact | null> {
        const phoneAccount = new PhoneAccount(phone)
        for (let i = 0; i < this.storage.length; i++) {
            if (this.storage[i].account.isEqual(phoneAccount)) {
                return this.storage[i]
            }
        }
        return null
    }

    public async findByEmail(email: Email): Promise<Contact | null> {
        const emailAccount = new EmailAccount(email)
        for (let i = 0; i < this.storage.length; i++) {
            if (this.storage[i].account.isEqual(emailAccount)) {
                return this.storage[i]
            }
        }
        return null
    }
}
