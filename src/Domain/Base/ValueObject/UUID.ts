import { v4 as uuidv4 } from 'uuid'
import Id from './Id'

export default class UUID extends Id<string> {
  public isValid (): boolean {
    if (!this.value) return false
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    const match = this.value.match(uuidRegex)
    return !(match == null)
  }

  public generate (): string {
    return uuidv4()
  }
}
