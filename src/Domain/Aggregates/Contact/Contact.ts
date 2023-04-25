import Entity from '@src/Domain/Base/Abstractions/Entity'
import PersonName, { PersonNameJSON } from '@src/Domain/Base/ValueObject/PersonName'
import UserId from '@src/Domain/Aggregates/User/ValueObjects/UserId'
import Complaint, { ComplaintJson } from './Complaint/Complaint'
import ComplaintId from './Complaint/ValueObjects/ComplaintId'
import ContactId from './ValueObjects/ContactId'
import Email from '@src/Domain/Base/ValueObject/Email'
import Phone from '@src/Domain/Base/ValueObject/Phone'

export interface ContactJson {
    id: string
    name: PersonNameJSON
    account: {
        contact_type: string
        value: string
    }
    complaints: ComplaintJson[]
}

type ContactAccount = Email | Phone

export default class Contact extends Entity {
    constructor(
        protected readonly contactId: ContactId,
        protected readonly personName: PersonName,
        protected readonly account: ContactAccount,
        protected readonly complaints: Complaint[]
    ) {
        super()
    }

    public getId(): ContactId {
        return this.contactId
    }

    public isValid(): boolean {
        return this.complaints.length >= 0
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
            const shouldBeRemoved = current.getId().isEqual(complaintId)
            const canBeRemoved = current.canBeRemovedBy(userId)
            if (shouldBeRemoved && canBeRemoved) {
                this.complaints.splice(i, 1)
                return current
            }
        }
        return null
    }

    public getAccount(): ContactAccount {
        return this.account
    }

    public getComplaints(): Complaint[] {
        return this.complaints
    }

    public toJSON(): ContactJson {
        return {
            id: this.contactId.getValue(),
            name: this.personName.toJSON(),
            account: {
                contact_type: this.account.constructor.name,
                value: this.account.getValue(),
            },
            complaints: this.complaints.map(complaint => complaint.toJSON()),
        }
    }
}
