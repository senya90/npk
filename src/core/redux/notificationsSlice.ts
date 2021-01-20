import { createSlice } from "@reduxjs/toolkit";

type NotificationSliceState = {
    error: any
    message: any
}

const getInitialState = (): NotificationSliceState => {
    return {
        error: undefined,
        message: undefined
    }
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState: getInitialState(),
    reducers: {
        setMessage(state, action) {
            state.message = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        }
    }
})


export const {setMessage, setError} = notificationSlice.actions
export default notificationSlice.reducer
