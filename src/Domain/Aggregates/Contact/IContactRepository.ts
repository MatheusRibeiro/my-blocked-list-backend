import IRepository from '@src/Domain/Base/Abstractions/Repository'
import Contact from './Contact'
import ContactId from './ValueObjects/ContactId'
import Email from '@src/Domain/Base/Types/Email'
import Phone from '@src/Domain/Base/Types/Phone'

export default interface IContactRepository extends IRepository<Contact, ContactId> {
    findByPhone: (phone: Phone) => Promise<Contact | null>
    findByEmail: (email: Email) => Promise<Contact | null>
}
