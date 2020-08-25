import { ChemicalAtom } from "./chemicalAtom"
import { ChemicalUnitValue } from "./chemicalUnitValue"

export class ChemicalAtomProportion {
    chemicalAtom: ChemicalAtom
    proportion: number

    constructor(chemicalAtom: ChemicalAtom, proportion: number ) {
        this.chemicalAtom = chemicalAtom
        this.proportion = proportion
    }

    toChemicalByMiligrams = (dosageMiligram: number): ChemicalUnitValue => {
        return new ChemicalUnitValue(
            this.chemicalAtom.chemicalUnit, 
            this.proportion * dosageMiligram
        )
    }
}