import {ChemicalUnit} from "../chemicalUnit";
import {Utils} from 'helpers/utils'

export class ChemicalUnitValue {
    chemicalUnit: ChemicalUnit
    private _value: number

    constructor(chemicalUnit: ChemicalUnit, value: number) {
        this.chemicalUnit = chemicalUnit;
        this._value = value;
    }

    get value(): number {
        return this._value
    }

    set value(value: number) {
        this._value = value
    }

    static merge = (chemicalUnits: ChemicalUnitValue[]): ChemicalUnitValue[] => {
        if (chemicalUnits.length <= 0) {
            return []
        }

        const results: any = {}

        chemicalUnits.forEach(chemical => {
            results[chemical.chemicalUnit.id] = [...results[chemical.chemicalUnit.id] || [], chemical]
        })

        console.log('results', results);
        const groupedChemicalValues: ChemicalUnitValue[][] = Utils.objectToArray(results)

        const resres: ChemicalUnitValue[] = []

        groupedChemicalValues.forEach(group => {
            const calculatedChemical: ChemicalUnitValue = new ChemicalUnitValue(group[0].chemicalUnit, 0)
            

            console.log('calculatedChemical 1', calculatedChemical);
            group.forEach(chemical => {
                
                calculatedChemical.value += chemical.value
            })
            console.log('calculatedChemical', calculatedChemical);
            
            resres.push(calculatedChemical)
        })
        
        
        return resres
    }
}