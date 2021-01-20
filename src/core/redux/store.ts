import {configureStore, combineReducers} from "@reduxjs/toolkit";
import userReducer from './userSlice'
import notificationReducer from './notificationsSlice'

const reducer = combineReducers({
    user: userReducer,
    notification: notificationReducer
})

export const store = configureStore({
    reducer: reducer
})
