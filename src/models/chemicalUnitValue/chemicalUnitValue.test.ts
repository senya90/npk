import { ChemicalUnitValue } from "./chemicalUnitValue"
import { chemicalComplexMock } from "mocks/chemicalComplexMock"
import { ChemicalUnit } from "models/chemicalUnit"
import { chemicalUnitsMock } from "mocks/chemicalMock"

describe('Chemical unit value', () => {
    const mg1 = new ChemicalUnitValue(chemicalUnitsMock.Mg, 12)
    const mg2 = new ChemicalUnitValue(chemicalUnitsMock.Mg, 10)
    const mg3 = new ChemicalUnitValue(chemicalUnitsMock.Mg, 2.2)
    const ca1 = new ChemicalUnitValue(chemicalUnitsMock.Ca, 1.1)
    const ca2 = new ChemicalUnitValue(chemicalUnitsMock.Ca, 0.5)
    const o = new ChemicalUnitValue(chemicalUnitsMock.O, 5)
    const n1 = new ChemicalUnitValue(chemicalUnitsMock.N, 33)
    const n2 = new ChemicalUnitValue(chemicalUnitsMock.N, 12.12)
    const p = new ChemicalUnitValue(chemicalUnitsMock.P, 50)

    describe('static merge()', () => {

        it('return array', () => {
            const chemicalUnitsValue: ChemicalUnitValue[] = [mg1, mg2, mg3, ca1, ca2, o, n1, n2, p]
            const result = ChemicalUnitValue.merge(chemicalUnitsValue)

            expect(Array.isArray(result)).toEqual(true)
        })

        it('empty array', () => {
            const chemicalUnitsValue: ChemicalUnitValue[] = []
            const result = ChemicalUnitValue.merge(chemicalUnitsValue)

            expect(result).toEqual([])
        })

        it('correct merge', () => {
            const chemicalUnitsValue: ChemicalUnitValue[] = [mg1, mg2, mg3, ca1, ca2, o, n1, n2, p]
            const result = ChemicalUnitValue.merge(chemicalUnitsValue)
                .map(chemicalUnitsValue => chemicalUnitsValue.value)

            expect(result).toEqual(
                [
                    new ChemicalUnitValue(chemicalUnitsMock.Mg, 24.2),
                    new ChemicalUnitValue(chemicalUnitsMock.Ca, 1.6),
                    new ChemicalUnitValue(chemicalUnitsMock.O, 5),
                    new ChemicalUnitValue(chemicalUnitsMock.N, 45.12),
                    new ChemicalUnitValue(chemicalUnitsMock.P, 50),
                ].map(chemicalUnitsValue => chemicalUnitsValue.value)
            )
        })
    })


    describe('static groupByChemical()', () => {

        it('correct grouping', () => {
            const chemicalUnitsValue: ChemicalUnitValue[] = [mg1, mg2, mg3, ca1, ca2, o, n1, n2, p]
            const result = ChemicalUnitValue.groupByChemical(chemicalUnitsValue)

            expect(result).toEqual([
                [mg1, mg2, mg3],
                [ca1, ca2],
                [o],
                [n1, n2],
                [p]
            ])
        })

        it('one chemical correct grouping', () => {
            const chemicalUnitsValue: ChemicalUnitValue[] = [ca2]
            const result = ChemicalUnitValue.groupByChemical(chemicalUnitsValue)

            expect(result).toEqual([
                [ca2]
            ])
        })

        it('empty', () => {
            const chemicalUnitsValue: ChemicalUnitValue[] = []
            const result = ChemicalUnitValue.groupByChemical(chemicalUnitsValue)

            expect(result).toEqual([])
        })
    })

})

