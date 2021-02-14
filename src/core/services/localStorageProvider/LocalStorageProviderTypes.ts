import {TokensPair} from "../../../models/tokensPair";

export interface ILocalStorageProvider {
    saveTokens: (tokens: TokensPair) => boolean
    getTokens: () => TokensPair | undefined
    clearTokens: () => void
}