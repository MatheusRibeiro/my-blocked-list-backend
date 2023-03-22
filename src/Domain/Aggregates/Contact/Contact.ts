import Entity from '../../Base/AbstractEntity'
import PersonName from '../../Base/ValueObject/PersonName'
import Complaint from './Complaint/Complaint'
import ContactAccount, { AccountType } from './ValueObjects/ContactAccount'
import ContactId from './ValueObjects/ContactId'

export interface ContactJson {
    id: string
    name: object
    account: object
    complaints: object[]
}

export default class Contact extends Entity {
    public contactId: ContactId
    public personName: PersonName
    public account: ContactAccount<AccountType>
    public complaints: Complaint[]

    constructor(
        contactId: ContactId,
        personName: PersonName,
        account: ContactAccount<AccountType>,
        complaints: Complaint[]
    ) {
        super()
        this.contactId = contactId
        this.personName = personName
        this.account = account
        this.complaints = complaints
    }

    public getId(): ContactId {
        return this.contactId
    }

    public isValid(): boolean {
        return this.personName.isValid() && this.account.isValid() && this.complaints.length >= 0
    }

    public isEqual(entity: Contact): boolean {
        return this.contactId.isEqual(entity.contactId)
    }

    public toJSON(): ContactJson {
        return {
            id: this.contactId.toJSON(),
            name: this.personName.toJSON(),
            account: this.account.toJSON(),
            complaints: this.complaints.map(complaint => complaint.toJSON()),
        }
    }
}
