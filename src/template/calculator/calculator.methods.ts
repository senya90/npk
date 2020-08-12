import {Mixture} from "../../models/mixture";

export const isMixtureAvailableForFertilizer = (mixture: Mixture | undefined, fertilizerId: string): boolean => {
    if (!mixture || mixture.dosages.length === 0) {
        return true
    }

    for (let i = 0; i < mixture.dosages.length; i++) {
        if (mixture.dosages[i].fertilizer.id === fertilizerId) {
            return false
        }
    }
    return true
}