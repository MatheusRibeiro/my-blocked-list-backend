import ValueObject from './ValueObject'

interface IPersonlName {
  firstName: string
  lastName: string
}

export default class PersoName extends ValueObject<IPersonlName> {
  public isValid (): boolean {
    return !!this.value.firstName
  }
}
