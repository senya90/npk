import {Solution, SolutionDTO} from "./solution"
import { solutionsMock } from "mocks/solutionsMock"
import { ChemicalUnitValue } from "models/chemicalUnitValue/chemicalUnitValue"
import { chemicalUnitsMock } from "mocks/chemicalMock"
import {fertilizersStubs} from "../../mocks/fertilizersMock";
import { Fertilizer } from "models/fertilizer/fertilizer";
import {Dosage} from "../dosage/dosage";

describe('Solution class', () => {

    describe('static getActualSolution()', () => {

        it('from DTO', () => {
            const solutionDTO: SolutionDTO = {
                id: 'test-id',
                name: 'test name',
                dosages: [],
                orderNumber: null,
                timestamp: null
            }
            const solution = new Solution(solutionDTO)
            const result = Solution.getActualSolution(solution)

            expect(result.name).toBe('test name')
            expect(result.id).toBe('test-id')
        })

        it('from undefined', () => {
            const result = Solution.getActualSolution(undefined)

            expect(result.name).toBe('')
            expect(result.dosages.length).toBe(0)
            expect(result.orderNumber).toBeNull()
            expect(result.timestamp).toBeNull()
        })

    })

    describe('toChemical', () => {

        it('is array', () => {
            const solution = new Solution()
            const result = solution.toChemicals()

            expect(Array.isArray(result)).toEqual(true)
        })

        it('MgSO4', () => {
            const solution = solutionsMock[2]
            const result = solution.toChemicals().map(chemical => chemical.value)

            const expectedValues = [
                new ChemicalUnitValue(chemicalUnitsMock.Mg, 62),
                new ChemicalUnitValue(chemicalUnitsMock.S, 82),
                new ChemicalUnitValue(chemicalUnitsMock.O, 164),
            ].map(chemical => chemical.value)

            expect(result).toEqual(expectedValues)
        })

        it('MgSO4, MgSO4*7H2O, PK, MgCaN, Fe', () => {
            const solution = solutionsMock[1]
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

    describe('addFertilizer()', () => {

        it('add fertilizer', () => {
            const solution = new Solution()

            solution.addFertilizer(fertilizersStubs.Fe_10)
            solution.addFertilizer(fertilizersStubs.Mg_1_2__Ca_0_5__N_0_3)

            expect(solution.dosages.length).toBe(2)
        })

        it('add empty fertilizer', () => {
            const solution = new Solution()

            solution.addFertilizer(new Fertilizer())

            expect(solution.dosages.length).toBe(1)
        })

    })

    describe('remove fertilizer', () => {

        it('remove existed fertilizer', () => {
            const solution = new Solution()

            solution.addFertilizer(fertilizersStubs.Fe_10)
            solution.addFertilizer(fertilizersStubs.MgSO4_11_22)
            solution.addFertilizer(fertilizersStubs.P_10__K_3_2)

            const newSolution = solution.removeFertilizer(fertilizersStubs.Fe_10.id)

            const remainingFertilizersIds: string[] = newSolution.dosages.map(dosage => dosage.fertilizer.id)
            const expectedIds = [fertilizersStubs.MgSO4_11_22.id, fertilizersStubs.P_10__K_3_2.id]

            expect(remainingFertilizersIds).toEqual(expectedIds)
        })

        it('remove multiple times', () => {
            const solution = new Solution()

            solution.addFertilizer(fertilizersStubs.Fe_10)
            solution.addFertilizer(fertilizersStubs.P_10__K_3_2)

            const newSolution = solution
                .removeFertilizer(fertilizersStubs.Fe_10.id)
                .removeFertilizer(fertilizersStubs.Fe_10.id)
                .removeFertilizer(fertilizersStubs.Fe_10.id)

            const remainingFertilizersIds: string[] = newSolution.dosages.map(dosage => dosage.fertilizer.id)
            const expectedIds = [fertilizersStubs.P_10__K_3_2.id]

            expect(remainingFertilizersIds).toEqual(expectedIds)
        })

        it('remove wrong id', () => {
            const solution = new Solution()

            solution.addFertilizer(fertilizersStubs.Fe_10)
            const newSolution = solution.removeFertilizer('some-id')

            const remainingFertilizersIds: string[] = newSolution.dosages.map(dosage => dosage.fertilizer.id)
            expect(remainingFertilizersIds).toEqual([fertilizersStubs.Fe_10.id])
        })

    })

    describe('update fertilizers', () => {

        const getNamesAndIds = (updatedSolution: Solution): {id: string, name: string}[] => {
            return updatedSolution.dosages.map(dosage => ({
                id: dosage.fertilizer.id,
                name: dosage.fertilizer.name
            }))
        }


        it('correct fertilizers name update', () => {
            const solution = new Solution()

            solution.addFertilizer(fertilizersStubs.Fe_10)
            solution.addFertilizer(fertilizersStubs.MgSO4_11_22)
            solution.addFertilizer(fertilizersStubs.P_10__K_3_2)

            const feWithNewName = fertilizersStubs.Fe_10
            feWithNewName.name = 'new Fe test name'
            const mgWithNewName = fertilizersStubs.MgSO4_11_22
            mgWithNewName.name = 'new Mg test name'


            const updatedSolution = solution.updateFertilizers([feWithNewName, mgWithNewName])
            const updatesFertilizersValues = getNamesAndIds(updatedSolution)

            expect(updatesFertilizersValues).toEqual([
                {id: fertilizersStubs.Fe_10.id, name: 'new Fe test name'},
                {id: fertilizersStubs.MgSO4_11_22.id, name: 'new Mg test name'},
                {id: fertilizersStubs.P_10__K_3_2.id, name: fertilizersStubs.P_10__K_3_2.name},
            ])
        })

        it('empty array for update', () => {
            const solution = new Solution()

            solution.addFertilizer(fertilizersStubs.Fe_10)
            const updatedSolution = solution.updateFertilizers([])

            const resultValues = getNamesAndIds(updatedSolution)
            expect(resultValues).toEqual([
                {id: fertilizersStubs.Fe_10.id, name: fertilizersStubs.Fe_10.name}
            ])
        })

        it('fertilizer by empty constructor', () => {
            const solution = new Solution()

            solution.addFertilizer(fertilizersStubs.Fe_10)
            solution.addFertilizer(fertilizersStubs.Mg_1_2__Ca_0_5__N_0_3)
            const updatedSolution = solution.updateFertilizers([new Fertilizer()])

            const resultValues = getNamesAndIds(updatedSolution)
            expect(resultValues).toEqual([
                {id: fertilizersStubs.Fe_10.id, name: fertilizersStubs.Fe_10.name},
                {id: fertilizersStubs.Mg_1_2__Ca_0_5__N_0_3.id, name: fertilizersStubs.Mg_1_2__Ca_0_5__N_0_3.name}
            ])
        })

    })

    describe('isAvailableForFertilizer()', () => {

        it('push another fertilizer', () => {
            const solution = new Solution()

            solution.addFertilizer(fertilizersStubs.Mg_1_2__Ca_0_5__N_0_3)

            const result = solution.isAvailableForFertilizer(fertilizersStubs.Fe_10)
            expect(result).toBe(true)
        })

        it('push the same fertilizer', () => {
            const solution = new Solution()

            solution.addFertilizer(fertilizersStubs.Mg_1_2__Ca_0_5__N_0_3)

            const result = solution.isAvailableForFertilizer(fertilizersStubs.Mg_1_2__Ca_0_5__N_0_3)
            expect(result).toBe(false)
        })

        it('push two empty fertilizers', () => {
            const solution = new Solution()

            solution.addFertilizer(new Fertilizer())

            const result = solution.isAvailableForFertilizer(new Fertilizer())
            expect(result).toBe(true)
        })

        it('check undefined fertilizer', () => {
            const solution = new Solution()

            solution.addFertilizer(new Fertilizer())

            const result = solution.isAvailableForFertilizer(undefined)
            expect(result).toBe(true)
        })

        it('if dosages are empty', () => {
            const solution = new Solution()

            const result = solution.isAvailableForFertilizer(new Fertilizer())
            expect(result).toBe(true)
        })

    })

})