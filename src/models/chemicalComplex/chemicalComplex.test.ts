import { chemicalComplexMock } from "mocks/chemicalComplexMock"
import { ChemicalAtomProportion } from "models/chemicalAtomProportion"
import { ChemicalAtom } from "models/chemicalAtom"
import { chemicalUnitsMock } from "mocks/chemicalMock"
import { ChemicalComplex } from "./chemicalComplex"
import {ChemicalAggregate} from "../chemicalAggregate/chemicalAggregate";
import {ChemicalUnit} from "../chemicalUnit";

describe('Chemical complex', () => {

    describe('constructor', () => {
        const complex = new ChemicalComplex('')

        expect(complex.chemicalAggregates.length).toBe(0)
    })

    describe('toAtomsProportions', () => {

        it('MgSO4', () => {
            const complex: ChemicalComplex = chemicalComplexMock.MgSO4
            const result = complex.toAtomsProportions().map(atom => atom.proportion)

            const expected: number[] = [
                new ChemicalAtomProportion(
                    new ChemicalAtom(chemicalUnitsMock.Mg),
                    0.201925
                ),
                new ChemicalAtomProportion(
                    new ChemicalAtom(chemicalUnitsMock.S),
                    0.266386
                ),
                new ChemicalAtomProportion(
                    new ChemicalAtom(chemicalUnitsMock.O, 4),
                    0.531689
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
                    0.098611
                ),
                new ChemicalAtomProportion(
                    new ChemicalAtom(chemicalUnitsMock.S),
                    0.130091
                ),
                new ChemicalAtomProportion(
                    new ChemicalAtom(chemicalUnitsMock.O, 4),
                    0.259653
                ),
                new ChemicalAtomProportion(
                    new ChemicalAtom(chemicalUnitsMock.H, 2),
                    0.057254
                ),
                new ChemicalAtomProportion(
                    new ChemicalAtom(chemicalUnitsMock.O, 2),
                    0.454392
                ),
            ].map(atom => atom.proportion)

            expect(result).toEqual(expected)
        })

        it('unit with 0 molar mass', () => {
            const unit = new ChemicalUnit('testUnit', 0, 'rt-yhj91238')
            const atom = new ChemicalAtom(unit)
            const aggregate = new ChemicalAggregate([atom])
            const complex = new ChemicalComplex('test', [aggregate])

            const result = complex.toAtomsProportions().map(atom => atom.proportion)

            expect(result).toEqual([0])
        })

    })

    describe('isValid', () => {

        it('correct values', () => {
            const complex = new ChemicalComplex('test', [], '123456')

            expect(complex.isValid()).toBe(true)
        })

        it('empty name', () => {
            const complex = new ChemicalComplex('', [], '123456')

            expect(complex.isValid()).toBe(false)
        })

        it('empty id constructor', () => {
            const complex = new ChemicalComplex('test', [])

            expect(complex.isValid()).toBe(true)
        })

        it('set empty string id', () => {
            const complex = new ChemicalComplex('test', [])
            complex.id = ''

            expect(complex.isValid()).toBe(true)
        })

    })
})
