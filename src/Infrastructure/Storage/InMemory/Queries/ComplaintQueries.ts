import IComplaintQueries, {
    ComplaintViewModel,
    GetComplaintsFromEmailQuery,
    GetComplaintsFromPhoneQuery,
} from '@src/Application/Contact/Queries/IComplaintQueries'
import Complaint from '@src/Domain/Aggregates/Contact/Complaint/Complaint'
import InMemoryQuery from './InMemoryQuery'
import dbContext from '../DbContext'
import Contact from '@src/Domain/Aggregates/Contact/Contact'
import PhoneAccount from '@src/Domain/Aggregates/Contact/ValueObjects/PhoneAccount'
import Phone, { assertIsPhone } from '@src/Domain/Base/Types/Phone'
import UUID from '@src/Domain/Base/Types/UUID'
import EmailAccount from '@src/Domain/Aggregates/Contact/ValueObjects/EmailAccount'
import Email, { assertIsEmail } from '@src/Domain/Base/Types/Email'

export default class ComplaintInMemoryQueries extends InMemoryQuery implements IComplaintQueries {
    async getComplaintsFromPhone({ phone }: GetComplaintsFromPhoneQuery): Promise<ComplaintViewModel[]> {
        assertIsPhone(phone)
        const contact = this.getContactByPhone(phone)
        if (contact === null) {
            return []
        }
        const complaints = this.getComplaintsByContactId(contact.getId())
        if (complaints === null) {
            return []
        }
        return complaints.map(complaint => this.toViewModel(complaint, contact))
    }

    private getContactByPhone(phone: Phone): Contact | null {
        const repositoryName = this.repositoryNames.Contact
        const phoneAccount = new PhoneAccount(phone)
        for (let i = 0; i < dbContext[repositoryName].length; i++) {
            if ((dbContext[repositoryName][i] as Contact).getAccount().isEqual(phoneAccount)) {
                return dbContext[repositoryName][i] as Contact
            }
        }
        return null
    }

    async getComplaintsFromEmail({ email }: GetComplaintsFromEmailQuery): Promise<ComplaintViewModel[]> {
        assertIsEmail(email)
        const contact = this.getContactByEmail(email)
        if (contact === null) {
            return []
        }
        const complaints = this.getComplaintsByContactId(contact.getId())
        if (complaints === null) {
            return []
        }
        return complaints.map(complaint => this.toViewModel(complaint, contact))
    }

    private getContactByEmail(email: Email): Contact | null {
        const repositoryName = this.repositoryNames.Contact
        const emailAccount = new EmailAccount(email)
        for (let i = 0; i < dbContext[repositoryName].length; i++) {
            if ((dbContext[repositoryName][i] as Contact).getAccount().isEqual(emailAccount)) {
                return dbContext[repositoryName][i] as Contact
            }
        }
        return null
    }

    private getComplaintsByContactId(contactId: UUID): Complaint[] {
        const repositoryName = this.repositoryNames.Contact
        const result: Complaint[] = []
        for (let i = 0; i < dbContext[repositoryName].length; i++) {
            if ((dbContext[repositoryName][i] as Contact).getId() === contactId) {
                return (dbContext[repositoryName][i] as Contact).getComplaints()
            }
        }
        return result
    }

    private toViewModel(complaint: Complaint, contact: Contact): ComplaintViewModel {
        return {
            id: complaint.getId(),
            description: complaint.getDescription(),
            type: complaint.getType().toJSON(),
            contact: { id: contact.getId() },
        }
    }
}
