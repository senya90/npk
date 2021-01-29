import {ChemicalAtom} from "./chemicalAtom";
import {IdGenerator} from "../helpers/idGenerator/IdGenerator";

export class ChemicalAggregate {
    id: string
    atoms: ChemicalAtom[]
    multiplier: number

    static clone = (aggregate: ChemicalAggregate) => {
        return new ChemicalAggregate(
            [...aggregate.atoms],
            aggregate.multiplier
        )
    }

    constructor(atoms: ChemicalAtom[], multiplier = 1, id?: string) {
        this.atoms = atoms;
        this.multiplier = multiplier
        this.id = id ? id : IdGenerator.generate()
    }
}