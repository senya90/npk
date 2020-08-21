import {ChemicalAtom} from "./chemicalAtom";

export class ChemicalAggregate {
    atoms: ChemicalAtom[]
    multiplier: number

    static clone = (aggregate: ChemicalAggregate) => {
        return new ChemicalAggregate(
            [...aggregate.atoms],
            aggregate.multiplier
        )
    }

    constructor(atoms: ChemicalAtom[], multiplier = 1) {
        this.atoms = atoms;
        this.multiplier = multiplier
    }
}