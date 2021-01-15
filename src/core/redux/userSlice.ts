import { createSlice } from "@reduxjs/toolkit";
import {TokensPair} from "../../models/tokensPair";

type UserSliceState = {
    tokens: TokensPair | undefined
}

const initialState: UserSliceState = {
    tokens: undefined
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setTokens(state, action) {
            state.tokens = action.payload
        }
    }
})

export const {setTokens} = userSlice.actions
export default userSlice.reducer
