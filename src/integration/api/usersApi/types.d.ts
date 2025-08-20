interface GetAllUsersResponse {
    _id: string
    fullName: string
    username: string
    role: string
    branch: string
    balance: string
    avatar: string
    createdAt: string
    updatedAt: string
}

interface GetUserRequest {
    id?: string
}