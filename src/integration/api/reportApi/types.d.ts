import { ProfileResponse } from "../authApi/types"

interface GetReportResponse {
    _id: string
    branch: string
    from: ProfileResponse
    receiver: ProfileResponse
    expected: number
    actual: number
    status: string
    comment: string
    createdAt: string
    updatedAt: string
}

interface CreateReportResponse {
    branch: string
    from: string
    receiver: string
    expected: number
    actual: number
    status: string
    comment: string
    _id: string
    createdAt: string
    updatedAt: string
}

interface CreateReportRequest {
    expected?: number
    actual?: number
    comment?: string
    receiver?: string
}