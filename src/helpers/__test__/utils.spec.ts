import {isArray, isExist, notEmptyArray, notEmptyString, Utils} from '../utils'

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

    describe('isExist', () => {

        it('for undefined, null', () => {
            expect(isExist(undefined)).toBe(false)
            expect(isExist(null)).toBe(false)
        })

        it('for string, number, boolean', () => {
            expect(isExist('text')).toBe(true)
            expect(isExist(5)).toBe(true)
            expect(isExist(false)).toBe(true)
        })

        it('for object', () => {
            const testObj = {
                field: 'text'
            }
            expect(isExist(testObj)).toBe(true)
        })

        it('for empty object', () => {
            const testObj = {}
            expect(isExist(testObj)).toBe(true)
        })

        it('for array', () => {
            const arr = [1, 2, 3]
            expect(isExist(arr)).toBe(true)
        })

        it('for empty array', () => {
            const arr: any[] = []
            expect(isExist(arr)).toBe(true)
        })

        it('for function', () => {
            const test1 = function () {}
            const test2 = () => {}

            expect(isExist(test1)).toBe(true)
            expect(isExist(test2)).toBe(true)
        })

    })

    describe('isArray', () => {

        it('for undefined, null', () => {
            expect(isArray(undefined)).toBe(false)
            expect(isArray(null)).toBe(false)
        })

        it('for number, string, boolean', () => {
            expect(isArray(1)).toBe(false)
            expect(isArray('str')).toBe(false)
            expect(isArray(true)).toBe(false)
        })

        it('for object, empty object', () => {
            const test = {
                field: 'test'
            }

            expect(isArray(test)).toBe(false)
            expect(isArray({})).toBe(false)
        })

        it('for function', () => {
            const test = function () {}
            expect(isArray(test)).toBe(false)
        })

        it('for array', () => {
            expect(isArray([1, 2])).toBe(true)
        })

        it('for empty array', () => {
            expect(isArray([])).toBe(true)
        })

    })

    describe('notEmptyArray', () => {

        it('empty array', () => {
            expect(notEmptyArray([])).toBe(false)
        })

        it('array', () => {
            expect(
                notEmptyArray([1, 2, 'true', false, {}])
            ).toBe(true)
        })

        it('array of functions', () => {
            const functions = [
                function() {},
                function (a: string) {return a},
                () => {},
                (a: number, b: string) => {return a + b},
            ]
            expect(
                notEmptyArray(functions)
            ).toBe(true)
        })

        it('undefined, null', () => {
            expect(notEmptyArray(undefined)).toBe(false)
            expect(notEmptyArray(null)).toBe(false)
        })

        it('string, number, boolean, object', () => {
            expect(notEmptyArray('text')).toBe(false)
            expect(notEmptyArray(1)).toBe(false)
            expect(notEmptyArray(true)).toBe(false)
            expect(notEmptyArray({})).toBe(false)
        })

    })

    describe('notEmptyString', () => {

        it('string', () => {
            expect(notEmptyString('some string')).toBe(true)
        })

        it('empty string', () => {
            expect(notEmptyString('')).toBe(false)
        })

        it('array', () => {
            expect(notEmptyString(['some', 'test', 'text'])).toBe(false)
        })

        it('empty array', () => {
            expect(notEmptyString([])).toBe(false)
        })

        it('number, boolean, undefined, null, object, empty object', () => {
            expect(notEmptyString(1)).toBe(false)
            expect(notEmptyString(true)).toBe(false)
            expect(notEmptyString(undefined)).toBe(false)
            expect(notEmptyString(null)).toBe(false)
            expect(notEmptyString({field: 'test'})).toBe(false)
            expect(notEmptyString({})).toBe(false)
        })

    })

})