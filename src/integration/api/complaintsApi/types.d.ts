interface CreateComplaintResponse {
    from: string
    to: string
    content: string
    _id: string
    createdAt: string
    updatedAt: string
}

interface CreateComplaintRequest {
    to: string
    content: string
}

interface GetComplaintsResponse {
    _id: string
    from: {
        _id: string
        fullName: string
        username: string
        role: string
        branch: string
        avatar: string
        createdAt: string
        updatedAt: string
    }
    to: {
        _id: string
        fullName: string
        username: string
        role: string
        branch: string
        avatar: string
        createdAt: string
        updatedAt: string
    }
    content: string
    createdAt: string
    updatedAt: string
}

type GetComplaintsRequest = object