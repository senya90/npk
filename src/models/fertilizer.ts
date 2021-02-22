import { FertilizerIngredient } from "./fertilizerIngredient"
import {IdGenerator} from "../helpers/idGenerator/IdGenerator";
import { Utils } from "helpers/utils";

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
}