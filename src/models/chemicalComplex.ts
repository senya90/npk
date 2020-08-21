import {IdGenerator} from "../helpers/idGenerator/IdGenerator";
import {ChemicalUnitValue} from "./chemicalUnitValue";
import {ChemicalAtom} from "./chemicalAtom";
import { ChemicalAggregate } from "./chemicalAggregate";

export class ChemicalComplex {
    name: string
    chemicalAggregates: ChemicalAggregate[]
    id: string

    constructor(name: string, chemicalAggregates?: ChemicalAggregate[], id?: string,) {
        this.name = name;
        this.chemicalAggregates = chemicalAggregates ? chemicalAggregates : []
        this.id = id ? id : IdGenerator.generate();
    }

}