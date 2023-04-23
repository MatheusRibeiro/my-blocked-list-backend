export interface ComplaintViewModel {
    id: string
    description: string
    type: {
        category: string
        severity: string
    }
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
