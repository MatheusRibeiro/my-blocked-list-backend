import ValueObject from "./ValueObject";

interface IFullName {
    firstName: string
    lastName: string
}

export default class FullName extends ValueObject<IFullName> {
    public isValid() {
        return !!this.value.firstName
    }
}