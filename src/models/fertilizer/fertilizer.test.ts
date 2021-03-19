import {Fertilizer} from './fertilizer'

describe('Fertilizer class', () => {

    it('empty constructor', () => {
        const fertilizer = new Fertilizer()

        expect(fertilizer.ingredients.length).toBe(0)
    })

})