import {IdGenerator} from "../helpers/idGenerator/IdGenerator";
import { ChemicalUnitValue } from "./chemicalUnitValue/chemicalUnitValue";

export class Agriculture {
    id: string
    name: string
    vegetation?: ChemicalUnitValue[]
    bloom?: ChemicalUnitValue[]

    constructor(name = '', vegetation?: ChemicalUnitValue[], bloom?: ChemicalUnitValue[], id?: string,) {
        this.name = name;
        this.vegetation = vegetation ? vegetation : [];
        this.bloom = bloom ? bloom : [];
        this.id = id ? id : IdGenerator.generate();
    }

    clone = () => {
        const vegetation = this.vegetation ? [...this.vegetation] : []
        const bloom = this.bloom ? [...this.bloom] : []
        return new Agriculture(this.name, vegetation, bloom, this.id)
    }
}