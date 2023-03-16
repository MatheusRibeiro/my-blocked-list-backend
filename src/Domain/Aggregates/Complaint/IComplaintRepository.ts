import IRepository from '@src/Domain/Base/AbstractRepository'
import Complaint from './Complaint'
import ComplaintId from './ValueObjects/ComplaintId'

export default interface IComplaintRepository extends IRepository<Complaint, ComplaintId> {}
