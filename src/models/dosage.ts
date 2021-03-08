import {Fertilizer} from "./fertilizer/fertilizer";

export class Dosage {
    fertilizer: Fertilizer
    valueGram: number

    constructor(fertilizer: Fertilizer, value = 0) {
        this.fertilizer = new Fertilizer(fertilizer.name, fertilizer.ingredients, fertilizer.id, fertilizer.timestamp, fertilizer.orderNumber);
        this.valueGram = value;
    }
}