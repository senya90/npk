import {Fertilizer} from "./fertilizer/fertilizer";
import {IdGenerator} from "../helpers/idGenerator/IdGenerator";

export class Dosage {
    id: string
    fertilizer: Fertilizer
    valueGram: number

    constructor(fertilizer: Fertilizer, value = 0, id = IdGenerator.generate()) {
        this.id = id
        this.fertilizer = new Fertilizer(fertilizer.name, fertilizer.ingredients, fertilizer.id, fertilizer.timestamp, fertilizer.orderNumber);
        this.valueGram = value;
    }
}