import React from 'react'
import {Gag} from '../Gag'
import {shallow} from 'enzyme'
import { Icon } from 'components/atom/icon/Icon'
import { ICON_TYPE } from 'components/atom/icon/IconTypes'
import { Button } from 'components/atom/button/Button'

describe('<Gag />', () => {

    it('no icon', () => {
        const component = shallow(<Gag>some gag text</Gag>)
        expect(component.find(Icon)).toHaveLength(0)
    })

    it('with icon', () => {
        const icon = <Icon type={ICON_TYPE.Delete} />
        const component = shallow(<Gag icon={icon}>some gag text</Gag>)
        expect(component.find(Icon)).toHaveLength(1)
    })

    it('inner text', () => {
        const testText = 'some test text'
        const component = shallow(<Gag>{testText}</Gag>)
        expect(
            component.children().text()
        ).toEqual(testText)
    })

    it('inner Component', () => {
        const component = shallow(<Gag><Button>button</Button></Gag>)
        expect(
            component.children().find(Button)
        ).toHaveLength(1)
    })

})