import { createSlice } from "@reduxjs/toolkit";
import { TokensPair } from "models/_types/tokensPair";
import {LocalStorageProvider} from "../services/localStorageProvider/LocalStorageProvider";
import {User} from "../../models/_types/user";

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
            userId: null,
            role: null
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
        },

        resetAuth(state) {
            const initial = getInitialState()
            state.tokens = initial.tokens
            state.user = initial.user
        }
    }
})

export const {setTokens, setUser, resetAuth} = userSlice.actions
export default userSlice.reducer
