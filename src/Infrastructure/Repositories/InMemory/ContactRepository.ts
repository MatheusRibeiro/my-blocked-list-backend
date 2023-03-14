import IContactRepository from '@src/Domain/Aggregates/Contact/IContactRepository'
import Contact from '@src/Domain/Aggregates/Contact/Contact'
import ContactId from '@src/Domain/Aggregates/Contact/ValueObjects/ContactId'
import InMemoryRepository from './InMemoryRepository'
import PhoneAccount from '@src/Domain/Base/ValueObject/Phone'
import EmailAccount from '@src/Domain/Base/ValueObject/Email'

export default class ContactInMemoryRepository
    extends InMemoryRepository<Contact, ContactId>
    implements IContactRepository
{
    public async findByPhone(phone: PhoneAccount): Promise<Contact | null> {
        for (let i = 0; i < this.storage.length; i++) {
            if (this.storage[i].account.isEqual(phone)) {
                return this.storage[i]
            }
        }
        return null
    }

    public async findByEmail(email: EmailAccount): Promise<Contact | null> {
        for (let i = 0; i < this.storage.length; i++) {
            if (this.storage[i].account.isEqual(email)) {
                return this.storage[i]
            }
        }
        return null
    }
}
