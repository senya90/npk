import { chemicalComplexMock, chemicalComplexMockArray } from "mocks/chemicalComplexMock"
import { ChemicalAtomProportion } from "models/chemicalAtomProportion"
import { ChemicalAtom } from "models/chemicalAtom"
import { chemicalUnitsMock } from "mocks/chemicalMock"
import { ChemicalComplex } from "./chemicalComplex"

describe('Chemical complex', () => {
    describe('toAtomsProportions', () => {

        it('MgSO4', () => {
            const complex: ChemicalComplex = chemicalComplexMock.MgSO4
            const result = complex.toAtomsProportions().map(atom => atom.proportion)

            const expected: number[] = [
                new ChemicalAtomProportion(
                    new ChemicalAtom(chemicalUnitsMock.Mg),
                    0.2019
                ),
                new ChemicalAtomProportion(
                    new ChemicalAtom(chemicalUnitsMock.S),
                    0.2664
                ),
                new ChemicalAtomProportion(
                    new ChemicalAtom(chemicalUnitsMock.O, 4),
                    0.5317
                )
            ].map(atom => atom.proportion)

            expect(result).toEqual(expected)
        })

        it('MgSO4*7H2O', () => {
            const complex: ChemicalComplex = chemicalComplexMock.MgSO47H2O
            const result = complex.toAtomsProportions().map(atom => atom.proportion)

            const expected: number[] = [
                new ChemicalAtomProportion(
                    new ChemicalAtom(chemicalUnitsMock.Mg),
                    0.0986
                ),
                new ChemicalAtomProportion(
                    new ChemicalAtom(chemicalUnitsMock.S),
                    0.1301
                ),
                new ChemicalAtomProportion(
                    new ChemicalAtom(chemicalUnitsMock.O, 4),
                    0.2597
                ),
                new ChemicalAtomProportion(
                    new ChemicalAtom(chemicalUnitsMock.H, 2),
                    0.0573
                ),
                new ChemicalAtomProportion(
                    new ChemicalAtom(chemicalUnitsMock.O, 2),
                    0.4544
                ),
            ].map(atom => atom.proportion)

            expect(result).toEqual(expected)
        })


        
    })
})
