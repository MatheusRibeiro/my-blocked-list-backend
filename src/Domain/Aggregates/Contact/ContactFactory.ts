import Contact from './Contact'
import PersonName from '@src/Domain/Base/ValueObject/PersonName'
import ContactId from './ValueObjects/ContactId'
import contactAccountFactory from './ValueObjects/contactAccountFactory'
import { uuidFactory } from '@src/Domain/Base/ValueObject/UUID'
import Phone from '@src/Domain/Base/ValueObject/Phone'
import Email from '@src/Domain/Base/ValueObject/Email'

export interface RawContactDataWithoutId {
    personName: PersonName
    email?: Email
    phone?: Phone
}

export interface RawContactDataWithId extends RawContactDataWithoutId {
    contactId: string
}

export function contactFactoryWithoutId(rawData: RawContactDataWithoutId): Contact {
    const contactId = uuidFactory().value
    return contactFactoryWithId(Object.assign({ contactId }, rawData))
}

export function contactFactoryWithId({ contactId, personName, phone, email }: RawContactDataWithId): Contact {
    return new Contact(new ContactId(contactId), personName, contactAccountFactory({ email, phone }), [])
}
