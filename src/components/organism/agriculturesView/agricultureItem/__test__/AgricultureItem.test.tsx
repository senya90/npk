import React from "react";
import {AgricultureItem} from '../AgricultureItem'
import {mount} from "enzyme";
import { agriculturesStub } from 'mocks/agriculturesMock';

describe('<AgricultureItem />', () => {

    it('deleteAgriculture', () => {
        const deleteMock = jest.fn()
        const component = mount(<AgricultureItem
            agriculture={agriculturesStub.cucumber}
            onDelete={deleteMock}
            onEdit={() =>{}}
        />)

        component.find("[data-test-id='open-popover']").simulate('click')
        component.find("[data-test-id='delete-agriculture']").simulate('click')
        component.find("[data-test-id='delete-agriculture']").simulate('click')
        component.find("[data-test-id='delete-agriculture']").simulate('click')

        expect(deleteMock).toHaveBeenCalledTimes(3)
    })
})