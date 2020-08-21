import {IdGenerator} from "../helpers/idGenerator/IdGenerator";
import {ChemicalUnitValue} from "./chemicalUnitValue";
import {ChemicalAtom} from "./chemicalAtom";

export class ChemicalComplex {
    name: string
    chemicalAtoms: ChemicalAtom[]
    id: string
    private multiplier = 1

    constructor(name: string, chemicalAtoms?: ChemicalAtom[], id?: string,) {
        this.name = name;
        this.chemicalAtoms = chemicalAtoms ? chemicalAtoms : []
        this.id = id ? id : IdGenerator.generate();
    }

    setMultiplier = (value: number) => {
        this.multiplier = value
        return this
    }
}