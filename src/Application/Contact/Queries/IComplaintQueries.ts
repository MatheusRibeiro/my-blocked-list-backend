export interface ComplaintViewModel {
    id: string
    description: string
    category: number
    severity: number
    contact: { id: string }
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
