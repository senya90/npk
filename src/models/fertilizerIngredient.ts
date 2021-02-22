import { IdGenerator } from "helpers/idGenerator/IdGenerator";
import { ChemicalComplex } from "./chemicalComplex/chemicalComplex";

export type FertilizerIngredientDTO = {
    id: string
    chemicalComplex: ChemicalComplex,
    valuePercent: number
}

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

    static createFromDto(ingredient: FertilizerIngredientDTO): FertilizerIngredient {
        const complexes = ChemicalComplex.createFromDto(ingredient.chemicalComplex)
        return new FertilizerIngredient(
            complexes,
            ingredient.valuePercent,
            ingredient.id
        )
    }

    percentToDecimal = (): number => {
        return this.valuePercent / FertilizerIngredient.PERCENTS_TO_DECIMAL_DIVIDER
    }
}
