export type ServerResponse<T> = {
    data: {
        data: T
        error: ErrorResponse
        status: number
    }
}

export type ErrorResponse = {
    message: string
    code: number
    text: string
}