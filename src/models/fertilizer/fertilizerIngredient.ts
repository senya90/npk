import { IdGenerator } from "helpers/idGenerator/IdGenerator";
import { ChemicalComplex } from "../chemicalComplex/chemicalComplex";
import { FertilizerIngredientDTO } from "models/_types/fertilizer";


export class FertilizerIngredient {
    id: string;
    chemicalComplex: ChemicalComplex;
    valuePercent: number;
    private static PERCENTS_TO_DECIMAL_DIVIDER = 100

    constructor(chemicalComplex = new ChemicalComplex(''), valuePercent = 0, id?: string) {
        this.chemicalComplex = chemicalComplex;
        this.valuePercent = valuePercent;
        this.id = id ? id : IdGenerator.generate();
    }

    static createNew(ingredient: FertilizerIngredientDTO): FertilizerIngredient {
        const complexes = ChemicalComplex.createNew(ingredient.chemicalComplex)
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
