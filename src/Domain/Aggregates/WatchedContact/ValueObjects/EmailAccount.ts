import ContactAccount from './ContactAccount'
import type Email from '@src/Domain/Base/Types/Email'

export default class EmailAccount extends ContactAccount<Email> {
    public readonly contactType = 'Email'
}
