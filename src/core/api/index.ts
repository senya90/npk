import {request} from "./request";
import {NotificationService} from "../services/notificationService/NotificationService";
import { store } from "core/redux/store";
import {INotificationService} from "../services/notificationService/NotificationServiceTypes";
import {NotificationHelper} from "../../helpers/notifications/notificationHelper";
import {LocalStorageProvider} from "../services/localStorageProvider/LocalStorageProvider";
import {ILocalStorageProvider} from "../services/localStorageProvider/LocalStorageProviderTypes";
import {UserService} from "../services/userService/UserService";
import {IUserService} from "../services/userService/UserServiceTypes";
import {TokenHelper} from "../../helpers/tokens";

interface IAPI {
    notificationService: INotificationService
    localStorageService: ILocalStorageProvider
    userService: IUserService

    get: (apiURL: string, apiParams?: any, headers?: any) => Promise<any>
    getAuthorized: (apiURL: string, apiParams?: any, headers?: any) => Promise<any>

    post: (apiURL: string, apiParams?: any, headers?: any) => Promise<any>
    postAuthorized: (apiURL: string, apiParams?: any, headers?: any) => Promise<any>

    deleteAuthorized: (apiURL: string, apiParams?: any, headers?: any) => Promise<any>
}

export const API: IAPI = {
    notificationService: new NotificationService(store.dispatch),
    localStorageService: new LocalStorageProvider(),
    userService: new UserService(store.dispatch, new LocalStorageProvider()),
    get: async function (apiURL: string, apiParams?: any, headers?: any): Promise<any> {
        return request.get(apiURL, apiParams, headers)
            .catch(err => {
                console.error(`API GET request error: `, err)
                console.error(`url:${apiURL} params: ${JSON.stringify(apiParams)}, headers: ${JSON.stringify(headers)}`)
                throw err
            })
    },
    getAuthorized: async function (apiURL: string, apiParams?: any, headers?: any): Promise<any> {
        const tokens = this.localStorageService.getTokens()
        let accessToken;
        if (tokens) {
            accessToken = tokens.accessToken
        }
        const authHeader = {'Authorization': `Bearer ${accessToken}`}
        return this.get(apiURL, apiParams, {...headers, ...authHeader})
    },
    postAuthorized: async function(apiURL: string, apiParams?: any, headers?: any) {
        const tokens = this.localStorageService.getTokens()
        let accessToken;
        if (tokens) {
            accessToken = tokens.accessToken
            const isActive = TokenHelper.isActive(tokens.accessToken)

            if (!isActive) {
                try {
                    const updatedTokens = await TokenHelper.updateTokens(tokens.refreshToken)
                    if (updatedTokens) {
                        await this.userService.updateTokens(updatedTokens);
                        accessToken = updatedTokens.accessToken
                    }
                } catch (err) {
                    console.log('Error auto update tokens', err)
                }
            }
        }

        const authHeader = {'Authorization': `Bearer ${accessToken}`}
        return this.post(apiURL, apiParams, {...headers, ...authHeader})
    },
    post: function (apiURL: string, apiParams?: any, headers?: any): Promise<any> {
        return request.post(apiURL, apiParams, headers)
            .then(response => {
                if (response.data.error) {
                    console.log(response.data.error)
                    console.log(response.data.error.message)
                    this.notificationService.notify(NotificationHelper.getError(response.data.error))
                }

                return response
            })
            .catch(err => {
                console.error(`API POST request error: `, err)
                console.error(`url:${apiURL} params: ${JSON.stringify(apiParams)}, headers: ${JSON.stringify(headers)}`)
                this.notificationService.notifySomethingWrong(err)

                throw err
            })
    },

    deleteAuthorized: function (apiURL: string, apiParams?: any, headers?: any): Promise<any> {
        const tokens = this.localStorageService.getTokens()
        let accessToken;
        if (tokens) {
            accessToken = tokens.accessToken
        }
        const authHeader = {'Authorization': `Bearer ${accessToken}`}

        const headersWithAuth = {
            ...headers,
            ...authHeader
        }
        return request.delete(apiURL, apiParams, headersWithAuth)
            .catch(err => {
                console.error(`API DELETE request error: `, err)
                console.error(`url:${apiURL} params: ${JSON.stringify(apiParams)}, headers: ${JSON.stringify(headersWithAuth)}`)
                throw err
            })
    }
}
