import {Dosage} from "./dosage";
import {IdGenerator} from "../helpers/idGenerator/IdGenerator";
import { Fertilizer } from "./fertilizer";

export class Mixture {
    dosages: Dosage[]
    name: string
    id: string

    constructor(name = '', dosages?: Dosage[], id?: string) {
        this.name = name
        this.dosages = dosages ? dosages : [];
        this.id = id ? id : IdGenerator.generate()
    }

    addFertilizer = (fertilizer: Fertilizer) => {
        this.addDosageItem(fertilizer)
    }

    private addDosageItem = (fertilizer: Fertilizer) => {
        this.dosages.push(new Dosage(fertilizer))
    }
}