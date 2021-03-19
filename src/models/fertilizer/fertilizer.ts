import { FertilizerIngredient } from "./fertilizerIngredient"
import {IdGenerator} from "../../helpers/idGenerator/IdGenerator";
import { Utils } from "helpers/utils";
import { FertilizerDTO } from "models/_types/fertilizer";

export class Fertilizer {
    id: string
    name: string
    ingredients: FertilizerIngredient[]
    orderNumber: number | null
    timestamp: number

    constructor(name = '', ingredients: FertilizerIngredient[] = [], id?: string, timestamp?: number, orderNumber?: number | null) {
        this.name = name
        this.ingredients = ingredients;
        this.id = id ? id : IdGenerator.generate();
        this.timestamp = timestamp || Utils.getNowTimeSeconds()
        this.orderNumber = orderNumber || null
    }

    static createNew(fertilizer: FertilizerDTO | Fertilizer): Fertilizer {
        const ingredients = fertilizer.ingredients.map(ingredient => FertilizerIngredient.createNew(ingredient))
        return new Fertilizer(
            fertilizer.name,
            ingredients,
            fertilizer.id,
            fertilizer.timestamp,
            fertilizer.orderNumber
        )
    }
}