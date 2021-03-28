import React from 'react'
import {IngredientsView} from '../IngredientsView'
import {mount, shallow} from "enzyme";
import {FertilizerIngredient} from "../../../../models/fertilizer/fertilizerIngredient";
import {chemicalComplexMock} from "../../../../mocks/chemicalComplexMock";
import {CalculatorContext, CalculatorContextMock, CalculatorContextType} from 'helpers/contexts/CalculatorContext';

describe('<IngredientsView />', () => {

    const getIngredients = (): FertilizerIngredient[] => {
        return [
            new FertilizerIngredient(chemicalComplexMock.MgSO4, 10),
            new FertilizerIngredient(chemicalComplexMock.Ca, 1),
            new FertilizerIngredient(chemicalComplexMock.B, 0.5),
            new FertilizerIngredient()
        ]
    }

    const getContext = (): CalculatorContextType => {
        return {
            ...CalculatorContextMock,
            chemicalComplexes: [
                chemicalComplexMock.MgSO4,
                chemicalComplexMock.Ca,
                chemicalComplexMock.B,
                chemicalComplexMock.MgSO47H2O,
                chemicalComplexMock.N
            ]
        }
    }

    it('render ingredients count', () => {
        const provider = mount(
            <CalculatorContext.Provider value={getContext()}>
                <IngredientsView ingredients={getIngredients()}/>
            </CalculatorContext.Provider>
        )

        expect(provider.find('.ingredient')).toHaveLength(3)
    })

    it('render right names', () => {
        const provider = mount(
            <CalculatorContext.Provider value={getContext()}>
                <IngredientsView ingredients={getIngredients()}/>
            </CalculatorContext.Provider>
        )

        const firstIngredient = provider.find('.ingredient').first()
        const lastIngredient = provider.find('.ingredient').last()

        expect(firstIngredient.find('.chemicalName').text()).toEqual('MgSO4')
        expect(lastIngredient.find('.chemicalName').text()).toEqual('B')
    })

    it('render right values', () => {
        const ingredients: FertilizerIngredient[] = getIngredients()
        const provider = mount(
            <CalculatorContext.Provider value={getContext()}>
                <IngredientsView ingredients={ingredients}/>
            </CalculatorContext.Provider>
        )

        const firstIngredient = provider.find('.ingredient').first()
        const lastIngredient = provider.find('.ingredient').last()

        expect(firstIngredient.find('.chemicalValue').text()).toEqual('10%')
        expect(lastIngredient.find('.chemicalValue').text()).toEqual('0.5%')
    })

    it('have fullSize style class', () => {
        const component = shallow(<IngredientsView ingredients={[]} fullSize/>)

        expect(component.hasClass('fullSize')).toEqual(true)
    })

})