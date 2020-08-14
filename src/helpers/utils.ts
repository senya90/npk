export class Utils {
    static round = (value: number, to = 4): number => {
        return Number(Number(value).toFixed(to))
    }
}
