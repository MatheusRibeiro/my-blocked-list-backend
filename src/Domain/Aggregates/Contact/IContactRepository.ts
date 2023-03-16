import Contact from './Contact'
import ContactId from './ValueObjects/ContactId'
import EmailAccount from '@src/Domain/Base/ValueObject/Email'
import PhoneAccount from '@src/Domain/Base/ValueObject/Phone'
import IRepository from '@src/Domain/Base/AbstractRepository'

export default interface IContactRepository extends IRepository<Contact, ContactId> {
    findByPhone: (phone: PhoneAccount) => Promise<Contact | null>
    findByEmail: (email: EmailAccount) => Promise<Contact | null>
}
