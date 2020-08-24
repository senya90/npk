import { IdGenerator } from "helpers/idGenerator/IdGenerator";

export class FertilizerIngredient {
    id: string;
    chemicalComplexId: string;
    valuePercent: number;
    private static PERCENTS_TO_DECIMAL_DIVIDER = 100

    constructor(chemicalComplexId = '', value = 0, id?: string) {
        this.chemicalComplexId = chemicalComplexId;
        this.valuePercent = value;
        this.id = id ? id : IdGenerator.generate();
    }

    percentToDecimal = (): number => {
        return this.valuePercent / FertilizerIngredient.PERCENTS_TO_DECIMAL_DIVIDER
    }
}
