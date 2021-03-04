import {ILocalStorageProvider} from "./LocalStorageProviderTypes";
import { TokensPair } from "models/_types/tokensPair";

export class LocalStorageProvider implements ILocalStorageProvider {
    private readonly LS_KEYS = {
        userTokens: 'userTokens'
    }

    getTokens(): TokensPair | undefined {
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

    saveTokens(tokens: TokensPair): boolean {
        try {
            localStorage.setItem(this.LS_KEYS.userTokens, JSON.stringify(tokens))
            return true
        } catch (e) {
            return false
        }
    }

    clearTokens(): void {
        try {
            localStorage.removeItem(this.LS_KEYS.userTokens)
        } catch (e) {
            console.log(e)
        }
    }
}