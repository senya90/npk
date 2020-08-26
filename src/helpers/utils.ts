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
