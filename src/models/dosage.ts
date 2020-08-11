import {Fertilizer} from "./fertilizer";

export class Dosage {
    fertilizer: Fertilizer
    value: number

    constructor(fertilizer: Fertilizer, value = 0) {
        this.fertilizer = fertilizer;
        this.value = value;
    }
}