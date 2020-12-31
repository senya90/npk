import {request} from "./request";


export const API = {
    get: async function(apiURL: string, apiParams?: any, headers?: any, ...args: any[]): Promise<any> {
        return request.get(apiURL, apiParams, headers, ...args)
    }
}


