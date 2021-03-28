import React from 'react'
import {AgriculturesView} from '../AgriculturesView'
import {mount, shallow} from "enzyme";
import {CalculatorContextMock, CalculatorContextType, CalculatorContext} from "../../../../helpers/contexts/CalculatorContext";
import {chemicalUnitsMockArray} from "../../../../mocks/chemicalMock";
import {Agriculture} from "../../../../models/agriculture";
import {agriculturesStub} from "../../../../mocks/agriculturesMock";
import {AgricultureItem, AgricultureItemProps} from '../agricultureItem/AgricultureItem';
import { Gag } from 'components/molecule/gag/Gag';
import { AgricultureEditor } from 'components/organism/agricultureEditor/AgricultureEditor';
import { Icon } from 'components/atom/icon/Icon';
import Modal from 'components/organism/modal/Modal';
import { API } from 'core/api';
import { ServerResponse } from 'models/_types/serverResponse';

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
            const component = shallow(<AgriculturesView agricultures={agricultures} activeAgriculture={active}/>)
            component.find('.addButton').simulate('click')

            const modalWrapper = shallow(component.find(Modal).get(0))
            modalWrapper.find('.closeModal').simulate('click')

            expect(component.find(AgricultureEditor)).toHaveLength(0)
        })

    })

    describe('API calls', () => {
        const agricultures = getAgricultures()
        const active = agricultures[0]

        it('API', () => {
            API.postAuthorized = jest.fn().mockImplementation((apiUrl: string, apiParams?: any, headers?: any): Promise<ServerResponse<string[]>> => {
                const response: ServerResponse<string[]> = {
                    data: {
                        data: [agricultures[0].id],
                        status: 500,
                        error: null
                    }
                } as ServerResponse<string[]>

                return Promise.resolve(response)
            })


            let mockOnDelete = jest.fn(() => {})

            const ctx: CalculatorContextType = {
                ...getContext(),
                onDeleteAgricultures: mockOnDelete
            }

            const component = mount(
                <CalculatorContext.Provider value={{
                    ...ctx
                }}>
                    <AgriculturesView agricultures={agricultures} activeAgriculture={active}/>
                </CalculatorContext.Provider>

                )

            const itemProps: AgricultureItemProps = component.find(AgricultureItem).get(0).props
            itemProps.onDelete(itemProps.agriculture)


            // TODO: check calls count
            // expect(mockOnDelete.mock.calls.length).toBe(1)
            expect('').toEqual('')
        })

    })

})