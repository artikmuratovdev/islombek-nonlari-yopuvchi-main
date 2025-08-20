interface SendMessageResponse {
    from: string,
    to: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    _id: string,
}

interface SendMessageRequest {
    to: string,
    content: string,
}

interface GetMessagesResponse {
    lastMessage: string

    chat: {
        _id: string,
        fullName: string,
        username: string
        password: string
        role: string
        branch: string
        balance: number
        avatar: string
        createdAt: string
        updatedAt: string
    }
}

interface GetMessageResponse {
    _id: string,
    from: string,
    to: string,
    content: string,
    createdAt: string,
    updatedAt: string,
}

interface GetMessageRequest {
    id: string,
}