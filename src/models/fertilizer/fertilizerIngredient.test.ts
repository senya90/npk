import {FertilizerIngredient} from "./fertilizerIngredient";
import {isExist} from "../../helpers/utils";

describe('FertilizerIngredient class', () => {

    it('empty constructor', () => {
        const ingredient = new FertilizerIngredient()

        expect(isExist(ingredient.chemicalComplex)).toBe(true)
        expect(isExist(ingredient.id)).toBe(true)
    })

})