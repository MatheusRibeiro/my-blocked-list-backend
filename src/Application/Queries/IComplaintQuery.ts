export interface ComplaintViewModel {
    complaintId: string
    description: string
    category: number
    severity: number
}
export interface GetComplaintsFromPhoneQuery {
    phone: string
}

export default interface IComplaintQuery {
    getComplaintsFromPhone: (params: GetComplaintsFromPhoneQuery) => Promise<ComplaintViewModel[]>
}
