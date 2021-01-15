import {configureStore, combineReducers} from "@reduxjs/toolkit";
import userReducer from './userSlice'

const reducer = combineReducers({
    user: userReducer
})

export const store = configureStore({
    reducer: reducer
})
