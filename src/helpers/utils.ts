export class Utils {
    static round = (value: number, to = 4): number => {
        return Number(Number(value).toFixed(to))
    }

    static objectToArray = (object: any): any[] => {
        if (!object) {
            return []
        }

        const arr = []
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                arr.push(object[key])
            }            
        }
        return arr
    }
}

export const isExist = (value: any) => {
    return value !== undefined && value !== null
}

export const isArray = (value: any) => {
    return isExist(value) && Array.isArray(value)
}

export const notEmptyArray = (value: any) => {
    return isArray(value) && value.length > 0
}

export const notEmptyString = (value: any) => {
    return typeof value === 'string' && value.length > 0
}