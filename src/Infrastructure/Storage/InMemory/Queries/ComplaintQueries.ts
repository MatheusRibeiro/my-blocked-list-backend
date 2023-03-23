import IComplaintQueries, {
    ComplaintViewModel,
    GetComplaintsFromPhoneQuery,
} from '@src/Application/Queries/IComplaintQueries'
import Complaint from '@src/Domain/Aggregates/Contact/Complaint/Complaint'
import InMemoryQuery from './InMemoryQuery'
import dbContext from '../DbContext'
import Contact from '@src/Domain/Aggregates/Contact/Contact'
import PhoneAccount from '@src/Domain/Aggregates/Contact/ValueObjects/PhoneAccount'
import NotFoundError from '@src/Domain/Errors/NotFoundError'
import Phone from '@src/Domain/Base/ValueObject/Phone'
import UUID from '@src/Domain/Base/ValueObject/UUID'

export default class ComplaintInMemoryQueries extends InMemoryQuery implements IComplaintQueries {
    async getComplaintsFromPhone({ phone }: GetComplaintsFromPhoneQuery): Promise<ComplaintViewModel[]> {
        const contact = this.getContactByPhone(new Phone(phone))
        if (contact === null) {
            throw new NotFoundError('Contact not found')
        }
        const complaints = this.getComplaintsByContactId(contact.contactId)
        if (complaints === null) {
            return []
        }
        return complaints.map(complaint => this.toViewModel(complaint, contact))
    }

    private getContactByPhone(phone: Phone): Contact | null {
        const repositoryName = this.repositoryNames.Contact
        const phoneAccount = new PhoneAccount(phone)
        for (let i = 0; i < dbContext[repositoryName].length; i++) {
            if ((dbContext[repositoryName][i] as Contact).account.isEqual(phoneAccount)) {
                return dbContext[repositoryName][i] as Contact
            }
        }
        return null
    }

    private getComplaintsByContactId(contactId: UUID): Complaint[] {
        const repositoryName = this.repositoryNames.Contact
        const result: Complaint[] = []
        for (let i = 0; i < dbContext[repositoryName].length; i++) {
            if ((dbContext[repositoryName][i] as Contact).contactId.isEqual(contactId)) {
                return (dbContext[repositoryName][i] as Contact).complaints
            }
        }
        return result
    }

    private toViewModel(complaint: Complaint, contact: Contact): ComplaintViewModel {
        return {
            id: complaint.complaintId.value,
            description: complaint.description.value,
            category: complaint.complaintType.value.complaintCategory,
            severity: complaint.complaintType.value.complaintSeverity,
            contact: { id: contact.contactId.value },
        }
    }
}
