import { ChemicalAtomProportion } from "./chemicalAtomProportion";
import { ChemicalUnitValue } from "./chemicalUnitValue/chemicalUnitValue";

export class AtomsProportionCalculator {
    private _atomsProportions: ChemicalAtomProportion[]

    constructor(chemicalProportions: ChemicalAtomProportion[]) {
        this._atomsProportions = chemicalProportions
    }

    set atomsProportions(value: ChemicalAtomProportion[]) {
        this._atomsProportions = value
    }

    correctDecimalByAggregate = (chemicalAggregateDecimal: number): ChemicalAtomProportion[] => {
        const atomsWithCorrectDecimals = this._atomsProportions.map(chemicalAtomProportion => {
            return new ChemicalAtomProportion(
                chemicalAtomProportion.chemicalAtom,
                chemicalAtomProportion.proportion * chemicalAggregateDecimal
            )
        })
        this.atomsProportions = atomsWithCorrectDecimals
        return atomsWithCorrectDecimals
    }

    toChemicalValueByMiligrams = (miligrams: number): ChemicalUnitValue[] => {
        return this._atomsProportions.map(atom => {
            return atom.toChemicalByMilligrams(miligrams)
        })
    }
}