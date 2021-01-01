import {request} from "./request";

interface IAPI {
    get: (apiURL: string, apiParams?: any, headers?: any) => Promise<any>
    post: (apiURL: string, apiParams?: any, headers?: any) => Promise<any>
}

export const API: IAPI = {
    get: function(apiURL: string, apiParams?: any, headers?: any): Promise<any> {
        return request.get(apiURL, apiParams, headers)
    },

    post: function(apiURL: string, apiParams?: any, headers?: any): Promise<any> {
        return new Promise(resolve => {
            resolve('Not implemented')
        })
    }
}
