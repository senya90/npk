import { IdGenerator } from "../../helpers/idGenerator/IdGenerator";
import { ChemicalAggregate } from "../chemicalAggregate";
import { ChemicalAtom } from "../chemicalAtom";
import { ChemicalAtomProportion } from "../chemicalAtomProportion";
import {isExist, Utils} from "helpers/utils";
import { ChemicalComplexDTO } from "models/_types/chemicalComplex";

export class ChemicalComplex {
    name: string
    chemicalAggregates: ChemicalAggregate[]
    id: string
    userId?: string

    constructor(name: string, chemicalAggregates?: ChemicalAggregate[], id?: string, userId?: string) {
        this.name = name;
        this.chemicalAggregates = chemicalAggregates ? this._aggregatesFactory(chemicalAggregates)  : []
        this.id = id ? id : IdGenerator.generate();
        this.userId = userId
    }

    static createFromDto(complex: ChemicalComplexDTO): ChemicalComplex {
        return new ChemicalComplex(complex.name, complex.chemicalAggregates, complex.id, complex.userId)
    }

    private _aggregatesFactory = (chemicalAggregates: ChemicalAggregate[]) => {
        return chemicalAggregates.map(aggregate => new ChemicalAggregate(aggregate.atoms, aggregate.multiplier, aggregate.id))
    }

    toAtomsProportions = (): ChemicalAtomProportion[] => {
        const allAggregatesMolarSum = Utils.round(this._getAllAggregatesMolar(), 6)
        return this._getAtomsProportionsByAggregatesMolar(allAggregatesMolarSum)
    }

    isValid = () => {
        return isExist(this.name) && this.name !== '' && isExist(this.id)
    }

    private _getAllAggregatesMolar = () => {
        return this.chemicalAggregates.reduce((sum, aggregate) => {
            const sumAllMolarMass = this._calculateMolarMassForAggregate(aggregate) * aggregate.multiplier
            return sum + sumAllMolarMass
        }, 0)
    }

    private _getAtomsProportionsByAggregatesMolar = (allAggregatesMolar: number): ChemicalAtomProportion[] => {
        const atoms: ChemicalAtomProportion[] = []

        this.chemicalAggregates.forEach(aggregate => {
            const allAtoms = this._getAtoms(aggregate)
            const atomsProportions = this._calculateProportionForEachAtom(aggregate, allAggregatesMolar, allAtoms)
            atoms.push(...atomsProportions)
        })

        return atoms;
    }

    private _calculateMolarMassForAggregate = (calculatedAggregate: ChemicalAggregate): number => {
        const aggregate = ChemicalAggregate.clone(calculatedAggregate)
        const atoms = this._getAtoms(aggregate)
        return atoms.reduce((sum, atom) => {
            return sum + atom.getMolarMass()
        }, 0)
    }

    private _getAtoms = (aggregate: ChemicalAggregate): ChemicalAtom[] => {
        return aggregate.atoms.map(atom => atom)
    }

    private _calculateProportionForEachAtom = (aggregate:ChemicalAggregate, aggregateMolarMass: number, atoms: ChemicalAtom[]): ChemicalAtomProportion[] => {
        return atoms.map(atom => {
            return new ChemicalAtomProportion(
                atom,
                this._calculateAtomProportion(aggregate, aggregateMolarMass, atom)
            )
        })
    }

    private _calculateAtomProportion = (aggregate: ChemicalAggregate,aggregateMolarMass: number, atom: ChemicalAtom): number => {
        if (aggregateMolarMass === 0) {
            return 0
        }
        return Utils.round((aggregate.multiplier * atom.getMolarMass()) / aggregateMolarMass, 6)
    }
}