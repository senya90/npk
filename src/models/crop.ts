import {IdGenerator} from "../helpers/idGenerator/IdGenerator";
import { ChemicalUnitValue } from "./chemicalUnitValue";

export class Crop {
    id: string
    name: string
    vegetation?: ChemicalUnitValue[]
    bloom?: ChemicalUnitValue[]

    constructor(name = '', composition?: ChemicalUnitValue[], bloom?: ChemicalUnitValue[], id?: string,) {
        this.name = name;
        this.vegetation = composition ? composition : [];
        this.bloom = bloom ? bloom : [];
        this.id = id ? id : IdGenerator.generate();
    }
}