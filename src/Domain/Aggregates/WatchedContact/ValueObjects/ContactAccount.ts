import ValueObject from '@src/Domain/Base/Abstractions/ValueObject'
import Email from '@src/Domain/Base/ValueObject/Email'
import Phone from '@src/Domain/Base/ValueObject/Phone'

export type AccountType = Phone | Email

export default abstract class ContactAccount<T extends AccountType = AccountType> extends ValueObject<T> {
    public isValid(): boolean {
        return true
    }

    public toJSON(): object {
        return {
            contact_type: this.constructor.name,
            value: this.value,
        }
    }
}
