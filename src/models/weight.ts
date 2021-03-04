export class Weight {

    private static GRAM_TO_MILLIGRAM_MULTIPLIER = 1000

    static gramToMilligram = (weight: number): number => {
        return weight * Weight.GRAM_TO_MILLIGRAM_MULTIPLIER
    }
}