import { FertilizerIngredient } from "./fertilizerIngredient"
import {IdGenerator} from "../helpers/idGenerator/IdGenerator";
import { Utils } from "helpers/utils";

export type FertilizerDTO = {
    id: string
    name: string
    ingredients: FertilizerIngredient[]
    timestamp: number
    order: number | null
}

export class Fertilizer {
    id: string
    name: string
    ingredients: FertilizerIngredient[]
    orderNumber: number | null | undefined
    timestamp: number

    constructor(name = '', ingredients?: FertilizerIngredient[], id?: string, timestamp?: number, order?: number | null) {
        this.name = name
        this.ingredients = ingredients ? ingredients : [];
        this.id = id ? id : IdGenerator.generate();
        this.timestamp = timestamp || Utils.getNowTimeSeconds()
        this.orderNumber = order
    }

    static createFromDTO(fertilizer: FertilizerDTO): Fertilizer {
        const ingredients = fertilizer.ingredients.map(ingredient => FertilizerIngredient.createFromDto(ingredient))
        return new Fertilizer(
            fertilizer.name,
            ingredients,
            fertilizer.id,
            fertilizer.timestamp,
            fertilizer.order
        )
    }
}