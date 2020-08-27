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

        it('correct work', () => {
            const mixture = mixturesMock[2]
            const result = mixture.toChemicals()
            console.log(result);
            

            expect(result).toEqual([
                new ChemicalUnitValue(chemicalUnitsMock.Mg, 0)
            ])
        })



    })
})