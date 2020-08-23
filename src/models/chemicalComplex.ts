import { IdGenerator } from "../helpers/idGenerator/IdGenerator";
import { ChemicalAggregate } from "./chemicalAggregate";
import { ChemicalAtom } from "./chemicalAtom";
import { ChemicalAtomProportion } from "./chemicalAtomProportion";

export class ChemicalComplex {
    name: string
    chemicalAggregates: ChemicalAggregate[]
    id: string

    constructor(name: string, chemicalAggregates?: ChemicalAggregate[], id?: string,) {
        this.name = name;
        this.chemicalAggregates = chemicalAggregates ? chemicalAggregates : []
        this.id = id ? id : IdGenerator.generate();
    }

    toChemicalProportions = (): ChemicalAtomProportion[][] => {
        const allAggregatesMolarSumm = this.getAllAggregatesMolar()
        return this.getAtomsProportionsByAggregatesMolar(allAggregatesMolarSumm)
    }

    private getAllAggregatesMolar = () => {
        return this.chemicalAggregates.reduce((sum, aggregate) => {
            const sumAllMolarMass = this.calculateMolarMassForAggregate(aggregate) * aggregate.multiplier
            return sum + sumAllMolarMass
        }, 0)
    }

    private getAtomsProportionsByAggregatesMolar = (allAggregatesMolar: number): ChemicalAtomProportion[][] => {
        return this.chemicalAggregates.map(aggregate => {
            const allAtoms = this.getAtoms(aggregate)
            return this.calculateProportionForEachAtom(allAggregatesMolar, allAtoms)
        })
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

    private calculateProportionForEachAtom = (aggregateMolarMass: number, atoms: ChemicalAtom[]): ChemicalAtomProportion[] => {
        return atoms.map(atom => {
            return new ChemicalAtomProportion(
                atom,
                this.calculateAtomProportion(aggregateMolarMass, atom)
            )
        })
    }

    private calculateAtomProportion = (aggregateMolarMass: number, atom: ChemicalAtom): number => {
        if (aggregateMolarMass === 0) {
            return 0
        }

        return atom.getMolarMass() / aggregateMolarMass
    }
}