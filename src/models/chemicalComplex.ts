import {IdGenerator} from "../helpers/idGenerator/IdGenerator";
import {ChemicalUnitValue} from "./chemicalUnitValue";
import { ChemicalAggregate } from "./chemicalAggregate";
import {ChemicalAtom} from "./chemicalAtom";
import {ChemicalUnit} from "./chemicalUnit";

export class ChemicalComplex {
    name: string
    chemicalAggregates: ChemicalAggregate[]
    id: string

    constructor(name: string, chemicalAggregates?: ChemicalAggregate[], id?: string,) {
        this.name = name;
        this.chemicalAggregates = chemicalAggregates ? chemicalAggregates : []
        this.id = id ? id : IdGenerator.generate();
    }

    toChemical = (): ChemicalUnitValue[] => {
        const molarSummAllAggregates = this.chemicalAggregates.reduce((sum, aggregate) => {
            const sumAllMolarMass = this.calculateMolarMassForAggregate(aggregate) * aggregate.multiplier
            return sum + sumAllMolarMass
        }, 0)

        this.chemicalAggregates.forEach(aggregate => {
            const allAtoms = this.getAtoms(aggregate)
            const chemicalUnitsWithProportions = this.calculateProportionForEachAtom(molarSummAllAggregates, allAtoms)
        })
        return []
    }

    private calculateMolarMassForAggregate = (calculatedAggregate: ChemicalAggregate): number => {
        const aggregate = ChemicalAggregate.clone(calculatedAggregate)
        const atoms = this.getAtoms(aggregate)
        return atoms.reduce((sum, atom) => {
            return sum + atom.getMolarMass()
        }, 0)
    }

    private getAtoms = (aggregate: ChemicalAggregate) => {
        return aggregate.atoms.map(atom => atom)
    }

    private calculateProportionForEachAtom = (aggregateMolarMass: number, atoms: ChemicalAtom[]): {chemicalAtom: ChemicalAtom, proportion: number}[] => {
        return atoms.map(atom => {
            return {
                chemicalAtom: atom,
                proportion: this.calculateAtomProportion(aggregateMolarMass, atom)
            }
        })
    }

    private calculateAtomProportion = (aggregateMolarMass: number, atom: ChemicalAtom): number => {
        if (aggregateMolarMass === 0) {
            return 0
        }

        return atom.getMolarMass() / aggregateMolarMass
    }
}