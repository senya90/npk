import {configureStore, combineReducers} from "@reduxjs/toolkit";
import userReducer from './userSlice'
import notificationReducer from './notificationsSlice'
import localeReducer from './localeSlice'

const reducer = combineReducers({
    user: userReducer,
    notification: notificationReducer,
    locale: localeReducer
})

export const store = configureStore({
    reducer: reducer
})
