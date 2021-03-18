import {Utils} from '../utils'

describe('Utils', () => {

    describe('objectToArray', () => {

        it('empty for undefined or null', () => {
            expect(Utils.objectToArray(undefined)).toEqual([])
            expect(Utils.objectToArray(null)).toEqual([])
            expect(Utils.objectToArray(null)).toEqual([])
        })

        it('for number', () => {
            expect(Utils.objectToArray(1)).toEqual([1])
        })

        it('for string', () => {
            const str = 'some str'
            expect(Utils.objectToArray(str)).toEqual([str])
        })

        it('for boolean', () => {
            expect(Utils.objectToArray(true)).toEqual([true])
        })

        it('for object', () => {
            const testObj = {
                field1: '1',
                field2: 2,
                field3: true,
                field4: [5, 6, 7],
                field5: {innerField: 'some inner field'}
            }

            const expected = ['1', 2, true, [5, 6, 7], {innerField: 'some inner field'}]

            expect(Utils.objectToArray(testObj)).toEqual(expected)
        })

        it('for empty object', () => {
            const testObj = {}

            expect(Utils.objectToArray(testObj)).toEqual([])
        })


    })

})