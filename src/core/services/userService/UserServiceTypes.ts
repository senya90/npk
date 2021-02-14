import {TokensPair} from "../../../models/tokensPair";

export interface IUserService {
    setAuthByStorage(): void
    updateTokens(newTokens: TokensPair): void
}