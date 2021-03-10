import {Fertilizer} from "./fertilizer/fertilizer";
import {IdGenerator} from "../helpers/idGenerator/IdGenerator";
import { FertilizerDTO } from "./_types/fertilizer";

export type DosageDTO = {
    id: string
    valueGram: number
    fertilizer: FertilizerDTO | Fertilizer
}

export class Dosage {
    id: string
    fertilizer: Fertilizer
    valueGram: number

    constructor(fertilizer: Fertilizer, value = 0, id = IdGenerator.generate()) {
        this.id = id
        this.fertilizer = Fertilizer.createNew(fertilizer)
        this.valueGram = value;
    }

    static createNew(dosage: DosageDTO | Dosage): Dosage {
        return new Dosage(dosage.fertilizer, dosage.valueGram, dosage.id)
    }
}