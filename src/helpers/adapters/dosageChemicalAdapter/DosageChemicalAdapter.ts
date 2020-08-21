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


        console.log('Dosage value gram', this.dosage.valueGram)
        this.dosage.fertilizer.ingredients.map(ingredient => {
            console.log(`ingredient ${ingredient.chemicalId} ${ingredient.valuePercent}`)
        })
        console.log(' ')
        return new ChemicalUnitValue(chemical, 0)
    }
}