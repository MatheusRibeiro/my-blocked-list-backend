import Phone from "./Phone"

const validPhone1 = '+55 9876-5432'
const validPhone2 = '+55 9123-4567'

describe('Phone Value Object', () => {
    test('phone is valid', () => {
        const phone = new Phone(validPhone1)
        expect(phone.isValid()).toBeTruthy
    })
    test('phone is invalid', () => {
        const phone = new Phone('invalid')
        expect(phone.isValid()).toBeFalsy
    })
    test('phone is equal', () => {
        const phone1 = new Phone(validPhone1)
        const phone2 = new Phone(validPhone1)
        expect(phone1.isEqual(phone2)).toBeTruthy
    })

    test('phone is not equal', () => {
        const phone1 = new Phone(validPhone1)
        const phone2 = new Phone(validPhone2)
        expect(phone1.isEqual(phone2)).toBeFalsy
    })
})
