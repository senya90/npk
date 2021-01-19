import { createSlice } from "@reduxjs/toolkit";
import { TokensPair } from "models/tokensPair";
import {LocalStorageProvider} from "../localStorageProvider/LocalStorageProvider";

type UserSliceState = {
    tokens: TokensPair | undefined
}

const getInitialState = (): UserSliceState => {
    const localStorageProvider = new LocalStorageProvider()
    return {
        tokens: localStorageProvider.getTokens()
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState: getInitialState(),
    reducers: {
        setTokens(state, action) {
            state.tokens = action.payload
        }
    }
})

export const {setTokens} = userSlice.actions
export default userSlice.reducer
