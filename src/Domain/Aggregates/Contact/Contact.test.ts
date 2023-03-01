import DomainError from "../../Base/DomainException"
import Contact from "./Contact"
import Email from "../../Base/ValueObject/Email"
import Phone from "../../Base/ValueObject/Phone"
import FullName from "../../Base/ValueObject/FullName"

const validPhone1 = '+55 9876-5432'
const validPhone2 = '+55 9123-4567'
const validEmail1 = 'email1@gmail.com'
const validEmail2 = 'email2@gmail.com'

describe('Add Account', () => {
    let contact: Contact
    beforeEach(() => {
      contact = new Contact(
        'contact id',
        new FullName({ firstName: "John", lastName: "Doe" }),
        'contact description') 
    })
    test('add valid accounts contact', () => {
        const email1 = new Email(validEmail1)
        const email2 = new Email(validEmail2)
        const phone = new Phone(validPhone1)

        contact.addAcount(email1)
        contact.addAcount(email2)
        contact.addAcount(phone)
    
        expect(contact.accounts.length).toBe(3)
    })
    
    test('add invalid phone to contact', () => {
        const phone = new Phone('invalid')
    
        const methodCall = () => contact.addAcount(phone)
        expect(methodCall).toThrow(Error)
    })
    
    test('add invalid email to contact', () => {
        const email = new Email('invalid')

        const methodCall = () => contact.addAcount(email)
        expect(methodCall).toThrow(DomainError)
    })
    
    test('add duplicated account contact', () => {
        const email1 = new Email(validEmail1)
        const email2 = new Email(validEmail1)

        contact.addAcount(email1)
        const methodCall = () => contact.addAcount(email2)
    
        expect(methodCall).toThrow(DomainError)
    })
    
})
