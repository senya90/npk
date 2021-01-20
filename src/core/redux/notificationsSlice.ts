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
        setNotification(state, action) {
            if (action.payload) {
                state.message = action.payload.message
                state.type = action.payload.type
            }
        },
        clearNotification(state: TNotification) {
            state.message = ''
            state.type = "INFO"
        }
    }
})


export type NotificationType = "INFO" | "WARNING" | "ERROR"

export type TNotification = {
    message: string
    type: NotificationType
}

export const {setNotification, clearNotification} = notificationSlice.actions
export default notificationSlice.reducer
