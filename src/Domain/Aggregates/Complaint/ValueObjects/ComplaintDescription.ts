import TextValueObject from '@src/Domain/Base/ValueObject/AbstractText'

export default class ComplaintDescription extends TextValueObject {
    public readonly minLength = 5
    public readonly maxLength = 255
}
