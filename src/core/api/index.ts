import {request} from "./request";
import {NotificationService} from "../services/notificationService/NotificationService";
import { store } from "core/redux/store";
import {INotificationService} from "../services/notificationService/NotificationServiceTypes";
import {NotificationHelper} from "../../helpers/notifications/notificationHelper";
import {LocalStorageProvider} from "../services/localStorageProvider/LocalStorageProvider";
import {UserService} from "../services/userService/UserService";
import {IUserService} from "../services/userService/UserServiceTypes";
import {ServerResponse} from "../../models/serverResponse";

interface IAPI {
    notificationService: INotificationService
    userService: IUserService

    get: <T = any>(apiURL: string, apiParams?: any, headers?: any) => Promise<ServerResponse<T>>
    getAuthorized: <T = any>(apiURL: string, apiParams?: any, headers?: any) => Promise<ServerResponse<T>>

    post: <T = any>(apiURL: string, apiParams?: any, headers?: any) => Promise<ServerResponse<T>>
    postAuthorized: <T = any>(apiURL: string, apiParams?: any, headers?: any) => Promise<ServerResponse<T>>

    deleteAuthorized: <T = any>(apiURL: string, apiParams?: any, headers?: any) => Promise<ServerResponse<T>>
}

export const API: IAPI = {
    notificationService: new NotificationService(store.dispatch),
    userService: new UserService(store.dispatch, new LocalStorageProvider()),
    get: async function <T>(apiURL: string, apiParams?: any, headers?: any): Promise<ServerResponse<T>> {
        return request.get(apiURL, apiParams, headers)
            .catch(err => {
                console.error(`API GET request error: `, err)
                console.error(`url:${apiURL} params: ${JSON.stringify(apiParams)}, headers: ${JSON.stringify(headers)}`)
                throw err
            })
    },
    getAuthorized: async function <T>(apiURL: string, apiParams?: any, headers?: any): Promise<ServerResponse<T>> {
        let accessToken = await this.userService.getAccessTokenUpdateIfNeed()
        const authHeader = {'Authorization': `Bearer ${accessToken}`}
        return this.get<T>(apiURL, apiParams, {...headers, ...authHeader})
    },
    postAuthorized: async function <T>(apiURL: string, apiParams?: any, headers?: any) {
        let accessToken = await this.userService.getAccessTokenUpdateIfNeed()
        const authHeader = {'Authorization': `Bearer ${accessToken}`}
        return this.post(apiURL, apiParams, {...headers, ...authHeader})
    },
    post: function <T>(apiURL: string, apiParams?: any, headers?: any): Promise<any> {
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

    deleteAuthorized: async function <T>(apiURL: string, apiParams?: any, headers?: any): Promise<any> {
        let accessToken = await this.userService.getAccessTokenUpdateIfNeed()
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
