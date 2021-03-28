export class Utils {
    static round = (value: number, to = 4): number => {
        const repairedFloatValue = Number(value) + 1 - 1;
        return Number(repairedFloatValue.toFixed(to))
    }

    static objectToArray = (object: any): any[] => {
        if (!object) {
            return []
        }

        if (typeof object === "number" || typeof object === "string" || typeof object === "boolean") {
            return [object]
        }

        const arr = []
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                arr.push(object[key])
            }            
        }
        return arr
    }

    static getNowTimeSeconds = () => {
        const MILLISECONDS_TO_SECONDS = 1000
        const seconds = new Date().valueOf() / MILLISECONDS_TO_SECONDS
        return Math.trunc(seconds)
    }

    static addSpaces = (target: string, twoSides = true, spaceSymbol = ' ') => {
        if (!twoSides) {
            return spaceSymbol + target
        }

        return spaceSymbol + target + spaceSymbol
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

export const isEmptyArray = (value: any[]) => {
    return isArray(value) && value.length === 0
}

export const notEmptyString = (value: any) => {
    return typeof value === 'string' && value.length > 0
}