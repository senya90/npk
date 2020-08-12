import { FertilizerIngredient } from "./fertilizerIngredient"
import {IdGenerator} from "../helpers/idGenerator/IdGenerator";

export class Fertilizer {
    id: string
    name: string
    ingredients: FertilizerIngredient[]

    constructor(name = 'empty', ingredients?: FertilizerIngredient[], id?: string) {
        this.name = name
        this.ingredients = ingredients ? ingredients : [];
        this.id = id ? id : IdGenerator.generate();
    }
}