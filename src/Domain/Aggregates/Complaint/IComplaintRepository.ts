import Complaint from './Complaint'
import ComplaintId from './ValueObjects/ComplaintId'

export default interface IContactRepository {
    create: (contact: Complaint) => Promise<null>
    update: (contact: Complaint) => Promise<null>
    findById: (contactId: ComplaintId) => Promise<Complaint | null>
}
