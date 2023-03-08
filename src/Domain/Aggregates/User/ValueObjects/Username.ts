import ValueObject from '../../../Base/ValueObject/ValueObject'

const MIN_LENGTH = 4
const MAX_LENGTH = 16

export default class Username extends ValueObject<string> {
  public isValid (): boolean {
    if (this.value.length < MIN_LENGTH || this.value.length > MAX_LENGTH) {
      return false
    }

    const usernameRegex = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/
    return !(this.value.match(usernameRegex) == null)
  }
}
