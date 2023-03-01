import FullName from "./FullName"

const validFullName1 = {
    firstName: 'John',
    lastName: 'Doe'
}

const validFullName2 = {
    firstName: 'Mary',
    lastName: 'Jane'
}

describe ('FullName Value Object', () => {
    test('full name is valid', () => {
        const fullName = new FullName(validFullName1)
        expect(fullName.isValid()).toBeTruthy()
    })
    test('full name with empty first name is invalid', () => {
        const fullName = new FullName({ firstName: '', lastName: 'Doe'})
        expect(fullName.isValid()).toBeFalsy()
    })
    test('full name with empty last name is valid', () => {
        const fullName = new FullName({ firstName: 'John', lastName: ''})
        expect(fullName.isValid()).toBeTruthy()
    })
    test('full name is equal', () => {
        const fullName1 = new FullName(validFullName1)
        const fullName2 = new FullName(validFullName1)
        expect(fullName1.isEqual(fullName2)).toBeTruthy()
    })
    test('full name is not equal', () => {
        const fullName1 = new FullName(validFullName1)
        const fullName2 = new FullName(validFullName2)
        expect(fullName1.isEqual(fullName2)).toBeFalsy()
    })
})
