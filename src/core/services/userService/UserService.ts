import { IUserService } from "./UserServiceTypes";
import {setTokens, setUser} from "../../redux/userSlice";
import {TokenHelper} from "../../../helpers/tokens";
import {ILocalStorageProvider} from "../localStorageProvider/LocalStorageProviderTypes";
import { TokensPair } from "models/tokensPair";

export class UserService implements IUserService {
    private readonly dispatch: any
    private readonly localStorageProvider: ILocalStorageProvider

    constructor(dispatch: any, localStorageProvider: ILocalStorageProvider) {
        this.dispatch = dispatch
        this.localStorageProvider = localStorageProvider
    }

    setAuthByStorage(): void {
        const tokens = this.localStorageProvider.getTokens()
        if (tokens) {
            this.dispatch(setTokens(tokens))
            this._setUserByToken(tokens.accessToken)
        }
    }

    updateTokens(newTokens: TokensPair): void {
        this.localStorageProvider.saveTokens(newTokens)
        this.dispatch(setTokens(newTokens))
        this._setUserByToken(newTokens.accessToken)
    }

    private _setUserByToken = (token: string) => {
        const user = TokenHelper.getUser(token)
        if (user) {
            this.dispatch(setUser(user))
        }
    }
}