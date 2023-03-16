import ValueObject from '../AbstractValueObject'

interface IPersonlName {
    firstName: string
    lastName: string
}

const MIN_FIRSTNAME_LENGTH = 1

export default class PersoName extends ValueObject<IPersonlName> {
    public isValid(): boolean {
        const { firstName } = this.value
        return typeof firstName === 'string' && firstName.length >= MIN_FIRSTNAME_LENGTH
    }
}
