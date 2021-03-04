import {Fertilizer} from "./fertilizer/fertilizer";

export class Dosage {
    fertilizer: Fertilizer
    valueGram: number

    constructor(fertilizer: Fertilizer, value = 0) {
        this.fertilizer = fertilizer;
        this.valueGram = value;
    }
}