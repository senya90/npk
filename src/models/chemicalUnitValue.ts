import {ChemicalUnit} from "./chemicalUnit";

export class ChemicalUnitValue {
    chemicalUnit: ChemicalUnit
    value: number

    constructor(chemicalUnit: ChemicalUnit, value: number) {
        this.chemicalUnit = chemicalUnit;
        this.value = value;
    }
}