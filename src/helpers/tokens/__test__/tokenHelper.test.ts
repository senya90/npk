import {TokenHelper} from '../index'

describe('TokenHelper', function () {

    describe('isActive', function () {

        it('wrong token format' , function () {
            expect(TokenHelper.isActive('qwerty')).toBeFalsy()
        })

    })
})