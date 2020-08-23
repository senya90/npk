import { ChemicalAtom } from "./chemicalAtom"

export class ChemicalAtomProportion {
    chemicalAtom: ChemicalAtom
    proportion: number


    constructor(chemicalAtom: ChemicalAtom, proportion: number ) {
        this.chemicalAtom = chemicalAtom
        this.proportion = proportion
    }
}