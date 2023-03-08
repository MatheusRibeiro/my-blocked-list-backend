import ValueObject from '../../../Base/ValueObject/ValueObject'

export default class Password extends ValueObject<string> {
    public isValid (): boolean {
        return !!this.value
    }
}
