import {TokensPair} from "../../../models/_types/tokensPair";

export interface IUserService {
    setAuthByStorage(): void
    updateTokens(newTokens: TokensPair | undefined): void
    getAccessTokenUpdateIfNeed(): Promise<string | undefined>
}