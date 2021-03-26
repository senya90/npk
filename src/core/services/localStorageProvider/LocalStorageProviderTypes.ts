import {TokensPair} from "../../../models/_types/tokensPair";
import { Locale } from "helpers/translate/translate";

export interface ILocalStorageProvider {
    saveTokens: (tokens: TokensPair) => boolean
    getTokens: () => TokensPair | undefined
    clearTokens: () => void
    saveLocale: (locale: Locale) => boolean
    getLocale: () => Locale | undefined
}