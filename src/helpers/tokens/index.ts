import jwt from 'jsonwebtoken'

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
    }
}
