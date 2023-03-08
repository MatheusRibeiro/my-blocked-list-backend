import PersonName from "./PersonName"

const validPersonName1 = {
    firstName: 'John',
    lastName: 'Doe'
}

const validPersonName2 = {
    firstName: 'Mary',
    lastName: 'Jane'
}

describe('PersonName Value Object', () => {
    test('person name is valid', () => {
        const personName = new PersonName(validPersonName1)
        expect(personName.isValid()).toBeTruthy()
    })
    test('person name with empty first name is invalid', () => {
        const personName = new PersonName({ firstName: '', lastName: 'Doe' })
        expect(personName.isValid()).toBeFalsy()
    })
    test('person name with empty last name is valid', () => {
        const personName = new PersonName({ firstName: 'John', lastName: '' })
        expect(personName.isValid()).toBeTruthy()
    })
    test('person name is equal', () => {
        const personName1 = new PersonName(validPersonName1)
        const personName2 = new PersonName(validPersonName1)
        expect(personName1.isEqual(personName2)).toBeTruthy()
    })
    test('person name is not equal', () => {
        const personName1 = new PersonName(validPersonName1)
        const personName2 = new PersonName(validPersonName2)
        expect(personName1.isEqual(personName2)).toBeFalsy()
    })
})
