import {Dosage} from '../dosage'
import {fertilizersStubs} from "../../../mocks/fertilizersMock";
import {ChemicalComplex} from "../../chemicalComplex/chemicalComplex";
import {chemicalComplexMock} from "../../../mocks/chemicalComplexMock";

describe('Dosage model', () => {

    describe('subtractPreviouslyUsedIngredients', () => {

        const getIngredientsIds = (dosage: Dosage) => {
            return dosage.fertilizer.ingredients.map(i => i.id)
        }

        it('update by correct complexes ids', () => {
            const dosage = new Dosage(fertilizersStubs.Mg_1_2__Ca_0_5__N_0_3, 10)
            const complexes: ChemicalComplex[] = [
                chemicalComplexMock.Mg,
                chemicalComplexMock.Ca
            ]

            const updatedDosage = dosage.subtractPreviouslyUsedIngredients(complexes)

            const expected = [
                fertilizersStubs.Mg_1_2__Ca_0_5__N_0_3.ingredients[0].id,
                fertilizersStubs.Mg_1_2__Ca_0_5__N_0_3.ingredients[1].id
            ]

            expect(getIngredientsIds(updatedDosage)).toEqual(expected)
        })

        it('update by empty complexes array', () => {
            const dosage = new Dosage(fertilizersStubs.Mg_11__MgSO4_3_2__MgSO47H2O_4_6, 0.1)
            const complexes: ChemicalComplex[] = []

            const updatedDosage = dosage.subtractPreviouslyUsedIngredients(complexes)

            expect(getIngredientsIds(updatedDosage)).toEqual([])
        })

        it('update by incorrect complexes ids', () => {
            const dosage = new Dosage(fertilizersStubs.Mg_1_2__Ca_0_5__N_0_3, 10)
            const complexes: ChemicalComplex[] = [
                chemicalComplexMock.Mg,
                new ChemicalComplex('', [], '342jj-jf90jfe-r')
            ]

            const updatedDosage = dosage.subtractPreviouslyUsedIngredients(complexes)

            const expected = [
                fertilizersStubs.Mg_1_2__Ca_0_5__N_0_3.ingredients[0].id,
            ]

            expect(getIngredientsIds(updatedDosage)).toEqual(expected)
        })
    })

})