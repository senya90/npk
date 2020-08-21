import {ChemicalUnit} from "./chemicalUnit";

export class ChemicalAtom {
    chemical: ChemicalUnit
    atomsCount: number // how many atoms


    constructor(chemical: ChemicalUnit, atomsCount = 1) {
        this.chemical = chemical;
        this.atomsCount = atomsCount;
    }

    getMolarMass = (): number => {
        return this.chemical.molar * this.atomsCount
    }
}