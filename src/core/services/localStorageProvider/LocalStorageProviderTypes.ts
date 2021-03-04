import {TokensPair} from "../../../models/_types/tokensPair";

export interface ILocalStorageProvider {
    saveTokens: (tokens: TokensPair) => boolean
    getTokens: () => TokensPair | undefined
    clearTokens: () => void
}