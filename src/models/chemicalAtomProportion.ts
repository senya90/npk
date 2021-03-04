import { ChemicalAtom } from "./chemicalAtom"
import { ChemicalUnitValue } from "./chemicalUnitValue/chemicalUnitValue"
import { Utils } from "helpers/utils"

export class ChemicalAtomProportion {
    chemicalAtom: ChemicalAtom
    proportion: number

    constructor(chemicalAtom: ChemicalAtom, proportion: number ) {
        this.chemicalAtom = chemicalAtom
        this.proportion = proportion
    }

    toChemicalByMilligrams = (dosageMilligram: number): ChemicalUnitValue => {
        return new ChemicalUnitValue(
            this.chemicalAtom.chemicalUnit, 
            Utils.round(this.proportion * dosageMilligram)
        )
    }
}