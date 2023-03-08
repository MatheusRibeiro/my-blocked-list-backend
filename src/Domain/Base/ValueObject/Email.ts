import ValueObject from './ValueObject'

export default class EmailAccount extends ValueObject<string> {
  public isValid (): boolean {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const match = this.value.match(emailRegex)
    return !(match == null)
  }
}
