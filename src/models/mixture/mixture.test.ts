import { Mixture } from "./mixture"
import { mixturesMock } from "mocks/mixturesMock"
import { ChemicalUnitValue } from "models/chemicalUnitValue/chemicalUnitValue"
import { chemicalUnitsMock, chemicalUnitsMockArray } from "mocks/chemicalMock"

describe('Mixture', () => {

    describe('toChemical', () => {


        it('is array', () => {
            const mixture = new Mixture()
            const result = mixture.toChemicals()

            expect(Array.isArray(result)).toEqual(true)
        })

        it('MgSO4', () => {
            const mixture = mixturesMock[3]
            const result = mixture.toChemicals()

            expect(result).toEqual([
                new ChemicalUnitValue(chemicalUnitsMock.Mg, 62),
                new ChemicalUnitValue(chemicalUnitsMock.S, 82),
                new ChemicalUnitValue(chemicalUnitsMock.O, 164),

            ])
        })

        it('MgSO4, MgSO4*7H2O, PK, MgCaN, Fe', () => {
            const mixture = mixturesMock[2]
            const result = mixture.toChemicals()

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
            ])
        })



    })
})