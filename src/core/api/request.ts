import axios from "axios";

export const request: IRequest =  {
    get: function(apiURL: string, apiParams?: any, headers?: any): Promise<any> {
        return axios.get(
            apiURL,
            {
                params: apiParams,
                headers: headers? {...headers} : undefined
            },
        )
    },

    post: function(apiURL: string, apiParams?: any, headers?: any): Promise<any> {
        return axios.post(
            apiURL,
            {
            ...apiParams,
            },
            {
                headers: headers? {...headers} : undefined
            }
        )
    }
}

export interface IRequest {
    get: (apiURL: string, apiParams?: any, headers?: any) => Promise<any>
    post: (apiURL: string, apiParams?: any, headers?: any) => Promise<any>
}