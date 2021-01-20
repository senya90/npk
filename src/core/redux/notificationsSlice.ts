import { createSlice } from "@reduxjs/toolkit";

const getInitialState = (): TNotification => {
    return {
        message: '',
        type: "INFO"
    }
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState: getInitialState(),
    reducers: {
        setMessage(state, action) {
            state.message = action.payload
        },
    }
})


export type NotificationType = "INFO" | "WARNING" | "ERROR"

export type TNotification = {
    message: string
    type: NotificationType
}

export const {setMessage} = notificationSlice.actions
export default notificationSlice.reducer
