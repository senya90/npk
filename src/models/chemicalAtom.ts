import {ChemicalUnit} from "./chemicalUnit";
import {IdGenerator} from "../helpers/idGenerator/IdGenerator";

export class ChemicalAtom {
    id: string
    chemicalUnit: ChemicalUnit
    atomsCount: number // how many atoms


    constructor(chemical: ChemicalUnit, atomsCount = 1, id?: string) {
        this.chemicalUnit = chemical;
        this.atomsCount = atomsCount;
        this.id = id ? id : IdGenerator.generate()
    }

    getMolarMass = (): number => {
        return this.chemicalUnit.molar * this.atomsCount
    }

    toString = (): string => {
        let count = String(this.atomsCount)
        if (this.atomsCount <= 1) {
            count = ''
        }

        return `${this.chemicalUnit.name}${count}`
    }
}