import { createSlice } from "@reduxjs/toolkit";
import { TokensPair } from "models/tokensPair";
import {LocalStorageProvider} from "../localStorageProvider/LocalStorageProvider";
import {User} from "../../models/user";

type UserSliceState = {
    tokens: TokensPair | undefined
    user: User
}

const getInitialState = (): UserSliceState => {
    const localStorageProvider = new LocalStorageProvider()
    return {
        tokens: localStorageProvider.getTokens(),
        user: {
            login: null,
            userId: null
        }
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState: getInitialState(),
    reducers: {
        setTokens(state, action) {
            state.tokens = action.payload
        },

        setUser(state, action) {
            state.user = action.payload
        }
    }
})

export const {setTokens, setUser} = userSlice.actions
export default userSlice.reducer
