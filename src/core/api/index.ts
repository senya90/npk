import {request} from "./request";
import {NotificationService} from "../notificationService/NotificationService";
import { store } from "core/redux/store";
import {INotificationService} from "../notificationService/NotificationServiceTypes";
import {NotificationHelper} from "../../helpers/notifications/notificationHelper";

interface IAPI {
    notificationService: INotificationService
    get: (apiURL: string, apiParams?: any, headers?: any) => Promise<any>
    post: (apiURL: string, apiParams?: any, headers?: any) => Promise<any>
}

export const API: IAPI = {
    notificationService: new NotificationService(store.dispatch),
    get: async function (apiURL: string, apiParams?: any, headers?: any): Promise<any> {
        return request.get(apiURL, apiParams, headers)
            .catch(err => {
                console.error(`API GET request error: `, err)
                console.error(`url:${apiURL} params: ${JSON.stringify(apiParams)}, headers: ${JSON.stringify(headers)}`)
                throw err
            })
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
    }
}
