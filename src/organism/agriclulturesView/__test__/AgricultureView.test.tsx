import React, {FunctionComponent} from 'react'
import {AgriculturesView} from '../AgriculturesView'
import {shallow, ShallowWrapper, mount, render} from "enzyme";
import {CalculatorContextMock, CalculatorContextType} from "../../../helpers/contexts/CalculatorContext";
import {chemicalUnitsMockArray} from "../../../mocks/chemicalMock";
import {Agriculture} from "../../../models/agriculture";
import {agriculturesStub} from "../../../mocks/agriculturesMock";
import { AgricultureItem } from '../agricultureItem/AgricultureItem';
import { Gag } from 'molecule/gag/Gag';
import { AgricultureEditor } from 'organism/agricultureEditor/AgricultureEditor';
import {AgriculturesProps} from "../AgricultureTypes";
import { Icon } from 'atom/icon/Icon';
import Modal from 'organism/modal/Modal';
import { App } from 'app/App';

describe('<AgriculturesView />', () => {

    const getContext = (): CalculatorContextType => {
        return {
            ...CalculatorContextMock,
            chemicals: chemicalUnitsMockArray()
        }
    }

    const getAgricultures = (): Agriculture[] => {
        return [
            agriculturesStub.cucumber,
            agriculturesStub.potatoes
        ]
    }

    describe('render', () => {
        const agricultures = getAgricultures()
        const active = agricultures[0]

        it('agricultures list two item', () => {
            const component = shallow(<AgriculturesView agricultures={agricultures} activeAgriculture={active}/>)

            expect(component.find(AgricultureItem)).toHaveLength(2)
        })

        it('agricultures empty list', () => {
            const component = shallow(<AgriculturesView agricultures={[]} activeAgriculture={new Agriculture()}/>)

            expect(component.find(AgricultureItem)).toHaveLength(0)
            expect(component.find(Gag)).toHaveLength(1)
        })

        it('agricultures empty list show <Gag />', () => {
            const component = shallow(<AgriculturesView agricultures={[]} activeAgriculture={new Agriculture()}/>)

            expect(component.find(Gag)).toHaveLength(1)
        })

        it('show edit modal on add', () => {
            const component = shallow(<AgriculturesView agricultures={agricultures} activeAgriculture={active}/>)

            component.find('.addButton').simulate('click')

            expect(component.find(AgricultureEditor)).toHaveLength(1)
        })

        it('show edit modal on edit', () => {
            const component = shallow(<AgriculturesView agricultures={agricultures} activeAgriculture={active}/>)
            const agricultureItemWrapper = shallow(component.find(AgricultureItem).get(0))
            const editButton = agricultureItemWrapper.find(Icon).find("[type='EditOutlined']")

            editButton.simulate('click')

            expect(component.find(AgricultureEditor)).toHaveLength(1)
        })

        it('close modal', () => {
            expect('').toHaveLength(0)

        })

    })

})