import IComplaintRepository from '@src/Domain/Aggregates/Complaint/IComplaintRepository'
import Complaint from '@src/Domain/Aggregates/Complaint/Complaint'
import ComplaintId from '@src/Domain/Aggregates/Complaint/ValueObjects/ComplaintId'
import InMemoryRepository from './InMemoryRepository'
import IComplaintQueryRepository from '@src/Application/Queries/IComplaintQueryRespository'
import ContactId from '@src/Domain/Aggregates/Contact/ValueObjects/ContactId'

export default class ComplaintInMemoryRepository
    extends InMemoryRepository<Complaint, ComplaintId>
    implements IComplaintRepository, IComplaintQueryRepository
{
    async findByContactId(contactId: ContactId): Promise<Complaint[]> {
        const result: Complaint[] = []
        for (let i = 0; i < this.storage.length; i++) {
            console.log(this.storage[i])
            if (this.storage[i].contactId.isEqual(contactId)) {
                result.push(this.storage[i])
            }
        }
        return result
    }
}
