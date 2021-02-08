import jwt from 'jsonwebtoken'
import {API} from "core/api";
import {ApiURL} from "core/api/ApiURL";
import {TokensPair} from "../../models/tokensPair";
import {User} from "../../models/user";

const SECONDS_TO_MILLISECONDS = 1000

export const TokenHelper = {
    isActive(token: string): boolean {
        try {
            const decoded: any = jwt.decode(token)

            if (decoded && decoded.exp) {
                const expireIn = decoded.exp * SECONDS_TO_MILLISECONDS
                return expireIn > Date.now()
            }

            return false
        } catch (e) {
            return false
        }
    },

    async updateTokens(refreshToken: string): Promise<TokensPair | undefined> {
        try {
            const response: any = await API.post(ApiURL.updateToken, null, {'Authorization': `Bearer ${refreshToken}`})
            if (response.data && response.data.data) {
                return response.data.data
            }

            return undefined
        } catch (e) {
            throw e
        }
    },

    getUser(token: string): User | null {
        const decoded: any = jwt.decode(token)
        if (decoded) {
            return {
                login: decoded.login,
                userId: decoded.userId
            }
        }

        return null
    }
}
