import ValidValueObject from './AbstractValidValueObject'

interface IPersonlName {
    firstName: string
    lastName: string
}

const MIN_FIRSTNAME_LENGTH = 1

export default class PersonName extends ValidValueObject<IPersonlName> {
    public isValid(): boolean {
        const { firstName } = this.value
        return firstName.length >= MIN_FIRSTNAME_LENGTH
    }

    public toJSON(): object {
        return {
            first_name: this.value.firstName,
            last_name: this.value.lastName,
        }
    }
}
