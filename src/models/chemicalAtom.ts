import {ChemicalUnit} from "./chemicalUnit";

export class ChemicalAtom {
    chemicalUnit: ChemicalUnit
    atomsCount: number // how many atoms


    constructor(chemical: ChemicalUnit, atomsCount = 1) {
        this.chemicalUnit = chemical;
        this.atomsCount = atomsCount;
    }

    getMolarMass = (): number => {
        return this.chemicalUnit.molar * this.atomsCount
    }
}