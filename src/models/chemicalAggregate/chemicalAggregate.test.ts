import {ChemicalAggregate} from './chemicalAggregate'
import {ChemicalAtom} from "../chemicalAtom";
import {chemicalUnitsMock} from "../../mocks/chemicalMock";

describe('ChemicalAggregate class', () => {

    const getSimpleAggregate = () => {
        const atom1 = new ChemicalAtom(chemicalUnitsMock.Fe, 2)
        const atom2 = new ChemicalAtom(chemicalUnitsMock.O)
        return new ChemicalAggregate([atom1, atom2])
    }

    const getAggregateWithMultiplier = (multiplier = 1) => {
        const atom3 = new ChemicalAtom(chemicalUnitsMock.Al, 4)
        const atom4 = new ChemicalAtom(chemicalUnitsMock.Mo)
        const atom5 = new ChemicalAtom(chemicalUnitsMock.Ca, 2)
        return new ChemicalAggregate([atom3, atom4, atom5], multiplier)
    }

    describe('constructor', () => {

        it('atoms for empty constructor', () => {
            const aggregate = new ChemicalAggregate()
            expect(aggregate.atoms.length).toBe(0)
        })
    })

    describe('static method allToString', () => {

        it('simple aggregate, aggregate with multiplier', () => {
            const aggregate1 = getSimpleAggregate()
            const aggregate2 = getAggregateWithMultiplier(2)

            const result = ChemicalAggregate.allToString([aggregate1, aggregate2])

            expect(result).toEqual('Fe2O * 2Al4MoCa2')
        })

        it('aggregate with zero/undefined multiplier', () => {
            const aggregate1 = getAggregateWithMultiplier(0)
            const aggregate2 = getAggregateWithMultiplier(undefined)

            const result1 = ChemicalAggregate.allToString([aggregate1])
            const result2 = ChemicalAggregate.allToString([aggregate2])

            expect(result1).toEqual('Al4MoCa2')
            expect(result2).toEqual('Al4MoCa2')
        })

        it('multiplier for each aggregate', () => {
            const aggregate1 = getAggregateWithMultiplier(2)
            const aggregate2 = getAggregateWithMultiplier(3)
            const aggregate3 = getAggregateWithMultiplier(5)
            const aggregate4 = getAggregateWithMultiplier(10)

            const result = ChemicalAggregate.allToString([aggregate1, aggregate2, aggregate3, aggregate4])

            expect(result).toBe('2Al4MoCa2 * 3Al4MoCa2 * 5Al4MoCa2 * 10Al4MoCa2')
        })

        it('empty aggregate', () => {
            const result = ChemicalAggregate.allToString([])

            expect(result).toEqual('')
        })

        it('empty atoms for aggregate', () => {
            const aggregate1 = new ChemicalAggregate([], 4, '231f89nv8dnv98sy-dfb8s7df-sd')
            const aggregate2 = getSimpleAggregate()
            const aggregate3 = new ChemicalAggregate([], 2)
            const aggregate4 = getSimpleAggregate()
            const result = ChemicalAggregate.allToString([aggregate1, aggregate2, aggregate3, aggregate4])

            expect(result).toBe('Fe2O * Fe2O')
        })

    })

})