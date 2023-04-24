import ValueObject from '../Abstractions/ValueObject'

interface IPersonlName {
    firstName: string
    lastName: string
}

export interface PersonNameJSON {
    first_name: string
    last_name: string
}

const MIN_FIRSTNAME_LENGTH = 1

export default class PersonName extends ValueObject<IPersonlName, PersonNameJSON> {
    public isValid(): boolean {
        const { firstName } = this.value
        return firstName.length >= MIN_FIRSTNAME_LENGTH
    }

    public toJSON(): PersonNameJSON {
        return {
            first_name: this.value.firstName,
            last_name: this.value.lastName,
        }
    }
}
