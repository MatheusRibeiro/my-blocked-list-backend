import Contact from './Contact'
import ContactId from './ValueObjects/ContactId'
import EmailAccount from '@src/Domain/Base/ValueObject/Email'
import PhoneAccount from '@src/Domain/Base/ValueObject/Phone'

export default interface IContactRepository {
    create: (contact: Contact) => Promise<null>
    findById: (contactId: ContactId) => Promise<Contact | null>
    findByPhone: (phone: PhoneAccount) => Promise<Contact | null>
    findByEmail: (email: EmailAccount) => Promise<Contact | null>
}
