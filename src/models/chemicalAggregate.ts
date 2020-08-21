import {ChemicalAtom} from "./chemicalAtom";

export class ChemicalAggregate {
    atoms: ChemicalAtom[]
    private _count = 1


    constructor(atoms: ChemicalAtom[], count?: number) {
        this.atoms = atoms;
    }


    set count(value: number) {
        if (value < 0) {
            this._count = 0
            return
        }
        this._count = value;
    }
}