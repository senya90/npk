import {TokenPair} from "../../models/tokenPair";

export interface ILocalStorageProvider {
    saveTokens: (tokens: TokenPair) => boolean
    getTokens: () => TokenPair | undefined
}