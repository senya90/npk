import axios from "axios";

export const request: IRequest =  {
    get: function(apiURL: string, apiParams?: any, headers?: any, ...args: any[]): Promise<any> {
        return axios.get(apiURL, {
            params: apiParams,
            headers: headers? [...headers] : undefined
        })
    }

}

export interface IRequest {
    get: (apiURL: string, apiParams?: any, headers?: any, ...args: any[]) => Promise<any>
}