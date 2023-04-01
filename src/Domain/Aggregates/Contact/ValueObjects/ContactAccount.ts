import ValueObject from '@src/Domain/Base/Abstractions/ValueObject'
import Email from '@src/Domain/Base/Types/Email'
import Phone from '@src/Domain/Base/Types/Phone'

export type AccountType = Phone | Email
export interface ContactAccountJSON {
    contact_type: string
    value: AccountType
}

export default abstract class ContactAccount<T extends AccountType> extends ValueObject<T> {
    public isValid(): boolean {
        return true
    }

    public toJSON(): ContactAccountJSON {
        return {
            contact_type: this.constructor.name,
            value: this.value,
        }
    }
}
