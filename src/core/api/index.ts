import {request} from "./request";

interface IAPI {
    get: (apiURL: string, apiParams?: any, headers?: any) => Promise<any>
    post: (apiURL: string, apiParams?: any, headers?: any) => Promise<any>
}

export const API: IAPI = {
    get: async function (apiURL: string, apiParams?: any, headers?: any): Promise<any> {
        return request.get(apiURL, apiParams, headers)
            .catch(err => {
                console.error(`API GET request error: `, err)
                console.error(`url:${apiURL} params: ${apiParams}, headers: ${headers}`
                )
            })
    },

    post: function (apiURL: string, apiParams?: any, headers?: any): Promise<any> {
        return request.post(apiURL, apiParams, headers)
            .catch(err => {
                console.error(`API POST request error: `, err)
                console.error(`url:${apiURL} params: ${apiParams}, headers: ${headers}`)
            })
    }
}
