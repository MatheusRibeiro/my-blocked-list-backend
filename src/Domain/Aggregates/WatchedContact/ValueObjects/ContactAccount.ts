import ValueObject from '@src/Domain/Base/AbstractValueObject'

export type AccountType = ValueObject<string> | ValueObject<number> | ValueObject<object>

export default abstract class ContactAccount<T extends AccountType = AccountType> extends ValueObject<T> {
    abstract contactType: string
    public isValid(): boolean {
        return this.value.isValid() && this.contactType.length > 0
    }

    public toJSON(): object {
        return {
            contact_type: this.contactType,
            value: this.value.toJSON(),
        }
    }
}
