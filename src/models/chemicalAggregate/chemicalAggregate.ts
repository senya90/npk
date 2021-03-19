import {ChemicalAtom} from "../chemicalAtom";
import {IdGenerator} from "../../helpers/idGenerator/IdGenerator";
import {notEmptyArray, isEmptyArray} from "../../helpers/utils";

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
        this.atoms = atoms ? this._atomsFactory(atoms) : [];
        this.multiplier = multiplier
        this.id = id ? id : IdGenerator.generate()
    }

    private _atomsFactory = (atoms: ChemicalAtom[]) => {
        return atoms.map(atom => new ChemicalAtom(atom.chemicalUnit, atom.atomsCount, atom.id))
    }

    static allToString = (aggregations: ChemicalAggregate[], separator = '*'): string => {
        return aggregations
            .map(aggregation => aggregation.toString())
            .filter(result => result)
            .join(` ${separator} `)
    }

    toString = (): string => {
        if (isEmptyArray(this.atoms)) {
            return ''
        }

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