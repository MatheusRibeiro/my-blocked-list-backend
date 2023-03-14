import Contact from './Contact'
import PersonName from '@src/Domain/Base/ValueObject/PersonName'
import ContactId from './ValueObjects/ContactId'
import contactAccountFactory from './ValueObjects/contactAccountFactory'
import { uuidFactory } from '@src/Domain/Base/ValueObject/UUID'

export interface RawContactDataWithoutId {
    firstName: string
    lastName: string
    description: string
    email?: string
    phone?: string
}

export interface RawContactDataWithId extends RawContactDataWithoutId {
    contactId: string
}

export function contactFactoryWithoutId(rawData: RawContactDataWithoutId): Contact {
    const contactId = uuidFactory().value
    return contactFactoryWithId(Object.assign({ contactId }, rawData))
}

export function contactFactoryWithId({
    contactId,
    firstName,
    lastName,
    description,
    phone,
    email,
}: RawContactDataWithId): Contact {
    return new Contact(
        new ContactId(contactId),
        new PersonName({ firstName, lastName }),
        description,
        contactAccountFactory({ email, phone })
    )
}
