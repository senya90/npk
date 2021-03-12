import {IdGenerator} from "../helpers/idGenerator/IdGenerator";

export type ChemicalUnitDTO = {
    id: string
    name: string
    molar: number
}

export class ChemicalUnit {
    id: string
    name: string
    molar: number

    constructor(name = '', molar = 0, id?: string) {
        this.name = name
        this.molar = molar
        this.id = id ? id : IdGenerator.generate()
    }

    static createNew(chemicalUnit: ChemicalUnit | ChemicalUnitDTO): ChemicalUnit {
        return new ChemicalUnit(
            chemicalUnit.name,
            chemicalUnit.molar,
            chemicalUnit.id
        )
    }
}