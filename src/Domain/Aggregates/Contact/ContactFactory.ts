import Contact from './Contact'
import PersonName from '@src/Domain/Base/ValueObject/PersonName'
import contactAccountFactory from './ValueObjects/contactAccountFactory'
import UUID from '@src/Domain/Base/ValueObject/UUID'
import Phone from '@src/Domain/Base/ValueObject/Phone'
import Email from '@src/Domain/Base/ValueObject/Email'
import { Valid } from '@src/Domain/Base/Abstractions/ValueObject'

export interface RawContactDataWithoutId {
    personName: Valid<PersonName>
    email?: Email
    phone?: Phone
}

export interface RawContactDataWithId extends RawContactDataWithoutId {
    contactId: UUID
}

export function contactFactoryWithoutId(rawData: RawContactDataWithoutId): Contact {
    const contactId = UUID.generate()
    return contactFactoryWithId(Object.assign({ contactId }, rawData))
}

export function contactFactoryWithId({ contactId, personName, phone, email }: RawContactDataWithId): Contact {
    return new Contact(contactId, personName, contactAccountFactory({ email, phone }), [])
}
