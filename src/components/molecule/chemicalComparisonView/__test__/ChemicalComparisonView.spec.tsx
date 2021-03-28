import React from 'react'
import {ChemicalComparisonView} from '../ChemicalComparisonView'
import {chemicalUnitsMock} from "../../../../mocks/chemicalMock";
import { shallow } from 'enzyme';
import {TableCell} from "../../../organism/table/tableCell/TableCell";

describe('<ChemicalComparisonView />', () => {

    it('correct chemical name', () => {
        const chemical = chemicalUnitsMock.Mo
        const component = (
            <ChemicalComparisonView
                chemical={chemical}
                mixed={0}
                vegetation={0}
                bloom={0}
            />
        )
        const shallowComparison = shallow(component)
        const firstCellShallow = shallow(shallowComparison.find(TableCell).get(0))

        expect(firstCellShallow.text()).toEqual(chemical.name)
    })

    it('correct value round', () => {
        const chemical = chemicalUnitsMock.Na
        const component = (
            <ChemicalComparisonView
                chemical={chemical}
                mixed={0.35}
                vegetation={10.57}
                bloom={5.12}
            />
        )
        const shallowComparison = shallow(component)
        const mixedCllShallow = shallow(shallowComparison.find(TableCell).get(1))
        const vegetationCellShallow = shallow(shallowComparison.find(TableCell).get(2))
        const bloomCellShallow = shallow(shallowComparison.find(TableCell).get(3))

        expect(mixedCllShallow.text()).toEqual('0.4')
        expect(vegetationCellShallow.text()).toEqual('10.6')
        expect(bloomCellShallow.text()).toEqual('5.1')
    })

    it('correct value round big values', () => {
        const chemical = chemicalUnitsMock.Al
        const component = (
            <ChemicalComparisonView
                chemical={chemical}
                mixed={1256633.54}
                vegetation={88888888888888}
                bloom={99999999.99999}
            />
        )
        const shallowComparison = shallow(component)
        const mixedCllShallow = shallow(shallowComparison.find(TableCell).get(1))
        const vegetationCellShallow = shallow(shallowComparison.find(TableCell).get(2))
        const bloomCellShallow = shallow(shallowComparison.find(TableCell).get(3))

        expect(mixedCllShallow.text()).toEqual('1256633.5')
        expect(vegetationCellShallow.text()).toEqual('88888888888888')
        expect(bloomCellShallow.text()).toEqual('100000000')
    })

})