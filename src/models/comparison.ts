import {ChemicalUnitValue} from "./chemicalUnitValue/chemicalUnitValue";

export class Comparison {
    chemical: ChemicalUnitValue
    ready: number
    vegetation: number
    bloom: number


    constructor(chemical: ChemicalUnitValue, ready: number, vegetation: number, bloom: number) {
        this.chemical = chemical;
        this.ready = ready;
        this.vegetation = vegetation;
        this.bloom = bloom;
    }
}