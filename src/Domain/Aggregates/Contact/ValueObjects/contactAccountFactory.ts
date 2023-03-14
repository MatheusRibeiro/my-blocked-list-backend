import Email from '@src/Domain/Base/ValueObject/Email'
import Phone from '@src/Domain/Base/ValueObject/Phone'
import BadRequestError from '@src/Domain/Errors/BadRequestError'
import type ContactAccount from './ContactAccount'

interface RawContactAccountData {
    email?: string
    phone?: string
}

export default function contactAccountFactory({ phone, email }: RawContactAccountData): ContactAccount {
    const accountsCreated: ContactAccount[] = []
    if (phone !== undefined) accountsCreated.push(new Phone(phone))
    if (email !== undefined) accountsCreated.push(new Email(email))

    if (accountsCreated.length < 1) {
        throw new BadRequestError('Missing phone or email information from contact account')
    }
    if (accountsCreated.length > 1) {
        throw new BadRequestError('Only one contact account is alliwed')
    }

    return accountsCreated[0]
}
