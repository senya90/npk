import { IdGenerator } from "helpers/idGenerator/IdGenerator";
import { ChemicalComplex } from "./chemicalComplex";

export class FertilizerIngredient {
    id: string;
    chemicalComplex: ChemicalComplex;
    valuePercent: number;
    private static PERCENTS_TO_DECIMAL_DIVIDER = 100

    constructor(chemicalComplex = new ChemicalComplex(''), value = 0, id?: string) {
        this.chemicalComplex = chemicalComplex;
        this.valuePercent = value;
        this.id = id ? id : IdGenerator.generate();
    }

    percentToDecimal = (): number => {
        return this.valuePercent / FertilizerIngredient.PERCENTS_TO_DECIMAL_DIVIDER
    }
}
