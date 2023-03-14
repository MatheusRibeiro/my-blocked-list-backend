import type Email from '@src/Domain/Base/ValueObject/Email'
import type Phone from '@src/Domain/Base/ValueObject/Phone'

type ContactAccount = Email | Phone

export default ContactAccount
