import {Fertilizer} from "./fertilizer/fertilizer";
import {IdGenerator} from "../helpers/idGenerator/IdGenerator";
import {FertilizerIngredient} from "./fertilizer/fertilizerIngredient";

export class Dosage {
    id: string
    fertilizer: Fertilizer
    valueGram: number

    constructor(fertilizer: Fertilizer, value = 0, id = IdGenerator.generate()) {
        const ingredients = fertilizer.ingredients.map(ingredient => FertilizerIngredient.createFromDto(ingredient))

        this.id = id
        this.fertilizer = new Fertilizer(fertilizer.name, ingredients, fertilizer.id, fertilizer.timestamp, fertilizer.orderNumber);
        this.valueGram = value;
    }
}