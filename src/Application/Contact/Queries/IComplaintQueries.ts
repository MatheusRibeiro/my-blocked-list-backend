import UUID from '@src/Domain/Base/Types/UUID'

export interface ComplaintViewModel {
    id: UUID
    description: string
    category: number
    severity: number
    contact: { id: UUID }
}
export interface GetComplaintsFromPhoneQuery {
    phone: string
}
export interface GetComplaintsFromEmailQuery {
    email: string
}

export default interface IComplaintQueries {
    getComplaintsFromPhone: (params: GetComplaintsFromPhoneQuery) => Promise<ComplaintViewModel[]>
    getComplaintsFromEmail: (params: GetComplaintsFromEmailQuery) => Promise<ComplaintViewModel[]>
}
