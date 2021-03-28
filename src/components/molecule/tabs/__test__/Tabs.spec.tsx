import React from 'react'
import {Tabs, TabPane} from '../Tabs'
import { shallow } from 'enzyme'

describe('<Tabs />', () => {
    it('is empty for empty children', () => {
        const component = shallow(<Tabs></Tabs>)
        expect(component.children().length).toEqual(0)
    })

    it ('correct tab by activeKey', () => {
        const tabs = <Tabs activeKey={'key#2'}>
            <TabPane key={'key#1'}>
                some Lorem ipsum dolor sit amet.1
            </TabPane>
            <TabPane key={'key#2'}>
                some Lorem ipsum dolor sit amet.2
            </TabPane>
            <TabPane key={'key#3'}>
                some Lorem ipsum dolor sit amet.3
            </TabPane>
        </Tabs>
        const component = shallow(tabs)

        expect(
            component.html()
        ).toContain('some Lorem ipsum dolor sit amet.2')
    })

    it ('first tab by default for undefined defaultActiveKey', () => {
        const tabs = <Tabs>
            <TabPane key={'key#1'}>
                some Lorem ipsum dolor sit amet.1
            </TabPane>
            <TabPane key={'key#2'}>
                some Lorem ipsum dolor sit amet.2
            </TabPane>
            <TabPane key={'key#3'}>
                some Lorem ipsum dolor sit amet.3
            </TabPane>
        </Tabs>
        const component = shallow(tabs)

        expect(
            component.html()
        ).toContain('some Lorem ipsum dolor sit amet.1')
    })
})