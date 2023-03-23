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

export default interface IComplaintQueries {
    getComplaintsFromPhone: (params: GetComplaintsFromPhoneQuery) => Promise<ComplaintViewModel[]>
}
