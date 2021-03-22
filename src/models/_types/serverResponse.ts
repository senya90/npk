export type ServerResponse<T> = {
    data: {
        data: T
        error: ErrorResponse | null
        status: number
    }
}

export type ErrorResponse = {
    message: string
    code: number
    text: string
}