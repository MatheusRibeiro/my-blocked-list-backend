import Entity from '@src/Domain/Base/Abstractions/Entity'
import PersonName, { PersonNameJSON } from '@src/Domain/Base/ValueObject/PersonName'
import UserId from '@src/Domain/Aggregates/User/ValueObjects/UserId'
import Complaint, { ComplaintJson } from './Complaint/Complaint'
import ComplaintId from './Complaint/ValueObjects/ComplaintId'
import ContactAccount, { AccountType, ContactAccountJSON } from './ValueObjects/ContactAccount'
import ContactId from './ValueObjects/ContactId'

export interface ContactJson {
    id: string
    name: PersonNameJSON
    account: ContactAccountJSON
    complaints: ComplaintJson[]
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

    public addComplaint(complaint: Complaint): null {
        this.complaints.push(complaint)
        return null
    }

    public removeComplaint(complaintId: ComplaintId, userId: UserId): Complaint | null {
        for (let i = 0; i < this.complaints.length; i++) {
            const current = this.complaints[i]
            const shouldBeRemoved = current.complaintId.isEqual(complaintId)
            const canBeRemoved = current.canBeRemovedBy(userId)
            if (shouldBeRemoved && canBeRemoved) {
                this.complaints.splice(i, 1)
                return current
            }
        }
        return null
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
