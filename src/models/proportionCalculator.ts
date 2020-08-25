import { ChemicalAtomProportion } from "./chemicalAtomProportion";

export class ProportionCalculator {
    private _chemicalProportions: ChemicalAtomProportion[][]

    constructor(chemicalProportions: ChemicalAtomProportion[][]) {
        this._chemicalProportions = chemicalProportions
    }

    set chemicalProportions(value: ChemicalAtomProportion[][]) {
        this._chemicalProportions = value
    }

    correctDecimalByAggregate = (chemicalAggragateDecimal: number): ChemicalAtomProportion[][] => {
        return this._chemicalProportions.map(chemicalBlockPropotions => {
            return chemicalBlockPropotions.map(chemicalAtomProportion => {
                return new ChemicalAtomProportion(chemicalAtomProportion.chemicalAtom, chemicalAtomProportion.proportion * chemicalAggragateDecimal)
            })
        })
    }

    toAtoms = (): ChemicalAtomProportion[] => {
        const weight: ChemicalAtomProportion[] = []
        this._chemicalProportions.forEach(chemicalBlockProportion => {
            chemicalBlockProportion.forEach(atom => {
                weight.push(
                    new ChemicalAtomProportion(atom.chemicalAtom, atom.proportion)
                )
            })            
        })
        return weight
    }





    // splittedChemicalsProportions = splittedChemicalsProportions.map(chemicalPropotions => {
    //     return chemicalPropotions.map(chemicalAtomProportion => {
    //         return new ChemicalAtomProportion(chemicalAtomProportion.chemicalAtom, chemicalAtomProportion.proportion * ingredient.percentToDecimal())
    //     })
    // })


}