import { ChemicalUnit, ChemicalUnitDTO } from "../chemicalUnit";
import { Utils } from "helpers/utils";

export type ChemicalUnitValueDTO = {
    chemicalUnit: ChemicalUnitDTO
    value: number
}

export class ChemicalUnitValue {
    chemicalUnit: ChemicalUnit
    private _value: number

    constructor(chemicalUnit: ChemicalUnit, value: number) {
        this.chemicalUnit = ChemicalUnit.createNew(chemicalUnit);
        this._value = value;
    }

    get value(): number {
        return this._value
    }

    set value(value: number) {
        this._value = value
    }

    static createNew(chemicalUnitValue: ChemicalUnitValue | ChemicalUnitValueDTO): ChemicalUnitValue {
        return new ChemicalUnitValue(
            chemicalUnitValue.chemicalUnit,
            chemicalUnitValue.value
        )
    }

    static merge = (chemicalUnits: ChemicalUnitValue[]): ChemicalUnitValue[] => {
        if (chemicalUnits.length <= 0) {
            return []
        }

        const groupedChemicals: ChemicalUnitValue[][] = ChemicalUnitValue.groupByChemical(chemicalUnits)        
        return ChemicalUnitValue.mergeValuesForGroups(groupedChemicals)
    }

    static groupByChemical = (groupedChemicals: ChemicalUnitValue[]): ChemicalUnitValue[][] => {
        const groups: ChemicalUnitValue[][] = []
        if (!groupedChemicals || groupedChemicals.length === 0) {
            return groups
        }

        let chemicals = [...groupedChemicals]
        let target = chemicals[0]

        while (chemicals.length > 0) {            
            const group = ChemicalUnitValue.getGroupByTarget(chemicals, target)
            groups.push(group)
            chemicals = ChemicalUnitValue.deleteGroupByTarget(chemicals, target)
            target = chemicals[0]
        }

        return groups
    }

    private static getGroupByTarget = (chemicals: ChemicalUnitValue[], target: ChemicalUnitValue): ChemicalUnitValue[] => {
        return chemicals.filter(chemical => chemical.chemicalUnit.id === target.chemicalUnit.id)
    }

    private static deleteGroupByTarget = (chemicals: ChemicalUnitValue[], target: ChemicalUnitValue): ChemicalUnitValue[] => {
        return chemicals.filter(chemical => chemical.chemicalUnit.id !== target.chemicalUnit.id)
    }

    static mergeValuesForGroups = (groups: ChemicalUnitValue[][]): ChemicalUnitValue[] => {
        const result: ChemicalUnitValue[] = []

        groups.forEach(group => {
            const initChemical: ChemicalUnitValue = new ChemicalUnitValue(group[0].chemicalUnit, 0)

            group.forEach(chemical => {
                initChemical.value = Utils.round(initChemical.value, 6) + Utils.round(chemical.value, 6)
            })
            
            result.push(initChemical)

        })
        return result
    }

    public normalizeValueForView = (to = 0): ChemicalUnitValue => {
        return new ChemicalUnitValue(this.chemicalUnit, Utils.round(this.value, to))
    }
}