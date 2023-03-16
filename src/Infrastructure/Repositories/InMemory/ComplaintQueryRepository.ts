import IComplaintQueryRepository from '@src/Application/Queries/IComplaintQueryRespository'
import Complaint from '@src/Domain/Aggregates/Complaint/Complaint'
import ContactId from '@src/Domain/Aggregates/Contact/ValueObjects/ContactId'
import ComplaintRepository from './ComplaintRepository'

export default class ComplaintQueryRepository extends ComplaintRepository implements IComplaintQueryRepository {
    async findByContactId(contactId: ContactId): Promise<Complaint[]> {
        const result: Complaint[] = []
        for (let i = 0; i < this.storage.length; i++) {
            if (this.storage[i].contactId.isEqual(contactId)) {
                result.push(this.storage[i])
            }
        }
        return result
    }
}
