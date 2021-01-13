import {ILocalStorageProvider} from "./LocalStorageProviderTypes";
import { TokenPair } from "models/tokenPair";

export class LocalStorageProvider implements ILocalStorageProvider {
    private readonly LS_KEYS = {
        userTokens: 'userTokens'
    }

    getTokens(): TokenPair | undefined {
        try {
            const tokens = localStorage.getItem(this.LS_KEYS.userTokens)
            if (tokens) {
                return JSON.parse(tokens)
            }

            return undefined
        } catch (e) {
            return undefined
        }
    }

    saveTokens(tokens: TokenPair): boolean {
        try {
            localStorage.setItem(this.LS_KEYS.userTokens, JSON.stringify(tokens))
            return true
        } catch (e) {
            return false
        }
    }
}