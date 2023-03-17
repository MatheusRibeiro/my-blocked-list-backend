import Entity from '../../Base/AbstractEntity'
import PersonName from '../../Base/ValueObject/PersonName'
import ContactAccount, { AccountType } from './ValueObjects/ContactAccount'
import ContactId from './ValueObjects/ContactId'

export interface ContactJson {
    id: string
    name: object
    account: object
}

export default class Contact extends Entity {
    public contactId: ContactId
    public personName: PersonName
    public account: ContactAccount<AccountType>

    constructor(contactId: ContactId, personName: PersonName, account: ContactAccount<AccountType>) {
        super()
        this.contactId = contactId
        this.personName = personName
        this.account = account
    }

    public getId(): ContactId {
        return this.contactId
    }

    public isValid(): boolean {
        return this.personName.isValid() && this.account.isValid()
    }

    public isEqual(entity: Contact): boolean {
        return this.contactId.isEqual(entity.contactId)
    }

    public toJSON(): ContactJson {
        return {
            id: this.contactId.toJSON(),
            name: this.personName.toJSON(),
            account: this.account.toJSON(),
        }
    }
}
