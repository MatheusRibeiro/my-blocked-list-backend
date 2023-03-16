import Complaint from '@src/Domain/Aggregates/Complaint/Complaint'
import IComplaintRepository from '@src/Domain/Aggregates/Complaint/IComplaintRepository'
import ContactId from '@src/Domain/Aggregates/Contact/ValueObjects/ContactId'

export default interface IComplaintQueryRepository extends IComplaintRepository {
    findByContactId: (contactId: ContactId) => Promise<Complaint[]>
}
