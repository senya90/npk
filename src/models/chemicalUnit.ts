import {IdGenerator} from "../helpers/idGenerator/IdGenerator";

export class ChemicalUnit {
    id: string
    name: string

    constructor(name = '', value = 0, id?: string) {
        this.name = name;
        this.id = id ? id : IdGenerator.generate();
    }
}