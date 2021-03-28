import React from 'react'
import {Button} from '../Button'
import {shallow} from "enzyme";

describe('<Button />', () => {

    it('empty click undefined', () => {
        const component = shallow(<Button>btn</Button>)
        const onClickResult = component.props().onClick()

        expect(onClickResult).toBeUndefined()
    })

    it('onClick called', () => {
        const mockCallback = jest.fn()
        const component = shallow(<Button onClick={mockCallback}>btn</Button>)
        component.props().onClick()
        component.props().onClick()

        expect(mockCallback.mock.calls.length).toBe(2)
    })

})