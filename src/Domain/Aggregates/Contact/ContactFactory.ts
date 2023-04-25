import Contact from './Contact'
import PersonName from '@src/Domain/Base/ValueObject/PersonName'
import UUID from '@src/Domain/Base/ValueObject/UUID'
import Phone from '@src/Domain/Base/ValueObject/Phone'
import Email from '@src/Domain/Base/ValueObject/Email'

export interface RawContactDataWithoutId {
    personName: PersonName
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
    if (email !== undefined) return new Contact(contactId, personName, email, [])
    if (phone !== undefined) return new Contact(contactId, personName, phone, [])
    throw new Error('Invalid contact value')
}
