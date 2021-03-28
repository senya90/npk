import React from 'react'
import {Title} from '../Title'
import { shallow } from 'enzyme'
import { Button } from 'components/atom/button/Button'


describe('<Title />', () => {

    it('children as text', () => {
        const titleText = 'some title text'
        const component = shallow(<Title>{titleText}</Title>)

        expect(component.children().text()).toEqual(titleText)
    })

    it('children as component', () => {
        const component = shallow(<Title><Button>button</Button></Title>)

        expect(component.children().find(Button)).toHaveLength(1)
    })

    it('border class', () => {
        const component = shallow(<Title border>title</Title>)

        expect(component.hasClass('withBorder')).toEqual(true)
    })

})
