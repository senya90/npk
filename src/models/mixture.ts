import {Dosage} from "./dosage";
import {IdGenerator} from "../helpers/idGenerator/IdGenerator";

export class Mixture {
    dosages: Dosage[]
    name: string
    id: string

    constructor(name = '', dosages: Dosage[], id?: string) {
        this.name = name
        this.dosages = dosages;
        this.id = id ? id : IdGenerator.generate()
    }
}