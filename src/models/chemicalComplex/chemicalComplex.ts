import { IdGenerator } from "../../helpers/idGenerator/IdGenerator";
import { ChemicalAggregate } from "../chemicalAggregate";
import { ChemicalAtom } from "../chemicalAtom";
import { ChemicalAtomProportion } from "../chemicalAtomProportion";
import { Utils } from "helpers/utils";

export class ChemicalComplex {
    name: string
    chemicalAggregates: ChemicalAggregate[]
    id: string

    constructor(name: string, chemicalAggregates?: ChemicalAggregate[], id?: string,) {
        this.name = name;
        this.chemicalAggregates = chemicalAggregates ? chemicalAggregates : []
        this.id = id ? id : IdGenerator.generate();
    }

    toAtomsProportions = (): ChemicalAtomProportion[] => {
        const allAggregatesMolarSumm = Utils.round(this.getAllAggregatesMolar(), 6)
        return this.getAtomsProportionsByAggregatesMolar(allAggregatesMolarSumm)
    }

    private getAllAggregatesMolar = () => {
        return this.chemicalAggregates.reduce((sum, aggregate) => {
            const sumAllMolarMass = this.calculateMolarMassForAggregate(aggregate) * aggregate.multiplier
            return sum + sumAllMolarMass
        }, 0)
    }

    private getAtomsProportionsByAggregatesMolar = (allAggregatesMolar: number): ChemicalAtomProportion[] => {
        const atoms: ChemicalAtomProportion[] = []

        this.chemicalAggregates.forEach(aggregate => {
            const allAtoms = this.getAtoms(aggregate)
            const atomsProportions = this.calculateProportionForEachAtom(aggregate, allAggregatesMolar, allAtoms)
            atoms.push(...atomsProportions)
        })

        return atoms;
    }

    private calculateMolarMassForAggregate = (calculatedAggregate: ChemicalAggregate): number => {
        const aggregate = ChemicalAggregate.clone(calculatedAggregate)
        const atoms = this.getAtoms(aggregate)
        return atoms.reduce((sum, atom) => {
            return sum + atom.getMolarMass()
        }, 0)
    }

    private getAtoms = (aggregate: ChemicalAggregate): ChemicalAtom[] => {
        return aggregate.atoms.map(atom => atom)
    }

    private calculateProportionForEachAtom = (aggregate:ChemicalAggregate, aggregateMolarMass: number, atoms: ChemicalAtom[]): ChemicalAtomProportion[] => {
        return atoms.map(atom => {
            return new ChemicalAtomProportion(
                atom,
                this.calculateAtomProportion(aggregate, aggregateMolarMass, atom)
            )
        })
    }

    private calculateAtomProportion = (aggregate: ChemicalAggregate,aggregateMolarMass: number, atom: ChemicalAtom): number => {
        if (aggregateMolarMass === 0) {
            return 0
        }
        return Utils.round((aggregate.multiplier * atom.getMolarMass()) / aggregateMolarMass, 6)
    }
}