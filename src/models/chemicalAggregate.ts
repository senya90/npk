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

    static allToString = (aggregations: ChemicalAggregate[], separator = '*') => {
        return aggregations
            .map(aggregation => aggregation.toString())
            .join(` ${separator} `)
    }

    toString = (): string => {
        const atomsString = this._atomsToString()

        let multiplierString = String(this.multiplier)
        if (this.multiplier <= 1) {
            multiplierString = ''
        }

        return `${multiplierString}${atomsString}`
    }

    private _atomsToString = (): string => {
        return this.atoms
            .map(atom => atom.toString())
            .join('')
    }
}