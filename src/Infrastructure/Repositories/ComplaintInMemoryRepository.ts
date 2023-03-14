import IComplaintRepository from '@src/Domain/Aggregates/Complaint/IComplaintRepository'
import Complaint from '@src/Domain/Aggregates/Complaint/Complaint'
import ComplaintId from '@src/Domain/Aggregates/Complaint/ValueObjects/ComplaintId'
import InMemoryRepository from './InMemoryRepository'

export default class ComplaintInMemoryRepository
    extends InMemoryRepository<Complaint, ComplaintId>
    implements IComplaintRepository {}
