import {Dosage} from "../../../models/dosage";
import {ChemicalUnitValue} from "../../../models/chemicalUnitValue";
import { ChemicalUnit } from "models/chemicalUnit";

export class DosageChemicalAdapter {
    dosage: Dosage


    constructor(dosage: Dosage) {
        this.dosage = dosage;
    }

    convertIngredientsToChemicalValue = (): ChemicalUnitValue => {
        const chemical = new ChemicalUnit()
        this.dosage.fertilizer.ingredients.map(ingred => {
            console.log('ingred', ingred)
        })
        return new ChemicalUnitValue(chemical, 0)
    }
}