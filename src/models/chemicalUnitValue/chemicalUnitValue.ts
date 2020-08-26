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

        const groupedObject: ChemicalUnitValue[][] = ChemicalUnitValue.groupByChemical(chemicalUnits)
        return ChemicalUnitValue.mergeValuesForGroups(groupedObject)
    }

    static groupByChemical = (chemicals: ChemicalUnitValue[]): any => {
        const groupedObject: any = {}
        chemicals.forEach(chemical => {
            groupedObject[chemical.chemicalUnit.id] = [...groupedObject[chemical.chemicalUnit.id] || [], chemical]
        })
        return Utils.objectToArray(groupedObject) 
    }

    static mergeValuesForGroups = (groups: ChemicalUnitValue[][]): ChemicalUnitValue[] => {
        const result: ChemicalUnitValue[] = []

        groups.forEach(group => {
            const initChemical: ChemicalUnitValue = new ChemicalUnitValue(group[0].chemicalUnit, 0)

            group.forEach(chemical => {
                initChemical.value += chemical.value
            })
            result.push(initChemical)

        })
        return result
    }
}