import { FertilizerIngredient } from "./fertilizerIngredient"
import {IdGenerator} from "../helpers/idGenerator/IdGenerator";

export class Fertilizer {
    id: string
    name: string
    composition: FertilizerIngredient[]

    constructor(name: string, composition: FertilizerIngredient[], id?: string) {
        this.name = name
        this.composition = composition;
        this.id = id ? id : IdGenerator.generate();
    }
}