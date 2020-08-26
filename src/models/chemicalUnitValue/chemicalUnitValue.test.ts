import { ChemicalUnitValue } from "./chemicalUnitValue"
import { chemicalComplexMock } from "mocks/chemicalComplexMock"
import { ChemicalUnit } from "models/chemicalUnit"
import { chemicalUnitsMock } from "mocks/chemicalMock"

describe('Chemical unit alue', () => {
    const mg1 = new ChemicalUnitValue(chemicalUnitsMock[4], 12)
    const mg2 = new ChemicalUnitValue(chemicalUnitsMock[4], 10)
    const mg3 = new ChemicalUnitValue(chemicalUnitsMock[4], 2.2)
    const ca1 = new ChemicalUnitValue(chemicalUnitsMock[3], 1.1)
    const ca2 = new ChemicalUnitValue(chemicalUnitsMock[3], 0.5)
    const o = new ChemicalUnitValue(chemicalUnitsMock[12], 5)
    const n1 = new ChemicalUnitValue(chemicalUnitsMock[0], 33)
    const n2 = new ChemicalUnitValue(chemicalUnitsMock[0], 12.12)
    const p = new ChemicalUnitValue(chemicalUnitsMock[1], 50)

    it('merge', () => {
        const chemicalUnitsValue: ChemicalUnitValue[] = [mg1, mg2, mg3, ca1, ca2, o, n1, n2, p]
        const result = ChemicalUnitValue.merge(chemicalUnitsValue)
        
        expect(result).toEqual([
            new ChemicalUnitValue(chemicalUnitsMock[4], 24.2),
            new ChemicalUnitValue(chemicalUnitsMock[3], 1.6),
            new ChemicalUnitValue(chemicalUnitsMock[12], 5),
            new ChemicalUnitValue(chemicalUnitsMock[0], 45.12),
            new ChemicalUnitValue(chemicalUnitsMock[1], 50),
        ])
    })
})