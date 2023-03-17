import Email from '@src/Domain/Base/ValueObject/Email'
import Phone from '@src/Domain/Base/ValueObject/Phone'
import BadRequestError from '@src/Domain/Errors/BadRequestError'
import type ContactAccount from './ContactAccount'
import EmailAccount from './EmailAccount'
import PhoneAccount from './PhoneAccount'

interface RawContactAccountData {
    email?: string
    phone?: string
}

type ValidAccountType = Email | Phone

export default function contactAccountFactory({
    phone,
    email,
}: RawContactAccountData): ContactAccount<ValidAccountType> {
    const accountsCreated: Array<ContactAccount<ValidAccountType>> = []
    if (phone !== undefined) accountsCreated.push(new PhoneAccount(new Phone(phone)))
    if (email !== undefined) accountsCreated.push(new EmailAccount(new Email(email)))

    if (accountsCreated.length < 1) {
        throw new BadRequestError('Missing phone or email information from contact account')
    }
    if (accountsCreated.length > 1) {
        throw new BadRequestError('Only one contact account is allowed')
    }

    return accountsCreated[0]
}
