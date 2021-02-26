import {request} from "./request";
import {NotificationService} from "../services/notificationService/NotificationService";
import { store } from "core/redux/store";
import {INotificationService} from "../services/notificationService/NotificationServiceTypes";
import {NotificationHelper} from "../../helpers/notifications/notificationHelper";
import {LocalStorageProvider} from "../services/localStorageProvider/LocalStorageProvider";
import {UserService} from "../services/userService/UserService";
import {IUserService} from "../services/userService/UserServiceTypes";

interface IAPI {
    notificationService: INotificationService
    userService: IUserService

    get: (apiURL: string, apiParams?: any, headers?: any) => Promise<any>
    getAuthorized: (apiURL: string, apiParams?: any, headers?: any) => Promise<any>

    post: (apiURL: string, apiParams?: any, headers?: any) => Promise<any>
    postAuthorized: (apiURL: string, apiParams?: any, headers?: any) => Promise<any>

    deleteAuthorized: (apiURL: string, apiParams?: any, headers?: any) => Promise<any>
}

export const API: IAPI = {
    notificationService: new NotificationService(store.dispatch),
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
        let accessToken = await this.userService.getAccessTokenUpdateIfNeed()
        const authHeader = {'Authorization': `Bearer ${accessToken}`}
        return this.get(apiURL, apiParams, {...headers, ...authHeader})
    },
    postAuthorized: async function(apiURL: string, apiParams?: any, headers?: any) {
        let accessToken = await this.userService.getAccessTokenUpdateIfNeed()
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

    deleteAuthorized: async function (apiURL: string, apiParams?: any, headers?: any): Promise<any> {
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
