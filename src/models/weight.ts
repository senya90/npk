export class Weight {

    private static GRAM_TO_MILIGRAM_MULTIPLIER = 1000

    static gramToMiligram = (weight: number): number => {
        return weight * Weight.GRAM_TO_MILIGRAM_MULTIPLIER
    }
}