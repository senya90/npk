import {IdGenerator} from "../helpers/idGenerator/IdGenerator";
import {ChemicalUnitValue} from "./chemicalUnitValue";
import { ChemicalAggregate } from "./chemicalAggregate";
import {ChemicalAtom} from "./chemicalAtom";

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
        console.log('toChemical', this.name)

        this.chemicalAggregates.forEach(aggregate => {
            const sumAllMolarMass = this.calculateMolarMassForAggregate(aggregate) * aggregate.multiplier
            console.log('sumAllMolarMass', sumAllMolarMass)
        })
        console.log(' ')
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

}