import { createSlice } from "@reduxjs/toolkit";
import {Locale} from "../../helpers/translate/translate";
import {LocalStorageProvider} from "../services/localStorageProvider/LocalStorageProvider";

const getInitialState = (): TLocaleSlice => {
    const localStorage = new LocalStorageProvider()

    return {
        locale: localStorage.getLocale() || 'en'
    }
}

const localeSlice = createSlice({
    name: 'locale',
    initialState: getInitialState(),
    reducers: {
        setLocale(state, action) {
            if (action.payload) {
                state.locale = action.payload
            }
        }
    }
})



export type TLocaleSlice = {
    locale: Locale
}

export const {setLocale} = localeSlice.actions
export default localeSlice.reducer
