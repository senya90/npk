import { Solution } from "./solution"
import { solutionsMock } from "mocks/solutionsMock"
import { ChemicalUnitValue } from "models/chemicalUnitValue/chemicalUnitValue"
import { chemicalUnitsMock } from "mocks/chemicalMock"

describe('Solution', () => {

    describe('toChemical', () => {


        it('is array', () => {
            const solution = new Solution()
            const result = solution.toChemicals()

            expect(Array.isArray(result)).toEqual(true)
        })

        it('MgSO4', () => {
            const solution = solutionsMock[3]
            const result = solution.toChemicals().map(chemical => chemical.value)

            expect(result).toEqual([
                new ChemicalUnitValue(chemicalUnitsMock.Mg, 62),
                new ChemicalUnitValue(chemicalUnitsMock.S, 82),
                new ChemicalUnitValue(chemicalUnitsMock.O, 164),

            ].map(chemical => chemical.value))
        })

        it('MgSO4, MgSO4*7H2O, PK, MgCaN, Fe', () => {
            const solution = solutionsMock[2]
            const result = solution.toChemicals().map(chemical => chemical.value)


            expect(result).toEqual([
                new ChemicalUnitValue(chemicalUnitsMock.Mg, 670),
                new ChemicalUnitValue(chemicalUnitsMock.S, 155),
                new ChemicalUnitValue(chemicalUnitsMock.O, 413),
                new ChemicalUnitValue(chemicalUnitsMock.H, 13),
                new ChemicalUnitValue(chemicalUnitsMock.P, 630),
                new ChemicalUnitValue(chemicalUnitsMock.K, 202),
                new ChemicalUnitValue(chemicalUnitsMock.Ca, 1),
                new ChemicalUnitValue(chemicalUnitsMock.N, 1),
                new ChemicalUnitValue(chemicalUnitsMock.Fe, 2),
            ].map(chemical => chemical.value))
        })
    })
})