import {IdGenerator} from "../helpers/idGenerator/IdGenerator";
import { ChemicalUnitValue } from "./chemicalUnitValue/chemicalUnitValue";

export type AgricultureDTO = {
    id: string
    name: string
    vegetation: ChemicalUnitValue[]
    bloom: ChemicalUnitValue[]
}

export class Agriculture {
    id: string
    name: string
    vegetation: ChemicalUnitValue[]
    bloom: ChemicalUnitValue[]

    constructor(name = '', vegetation?: ChemicalUnitValue[], bloom?: ChemicalUnitValue[], id?: string,) {
        this.name = name;
        this.vegetation = vegetation ? vegetation.map(vegetationChemical => ChemicalUnitValue.createNew(vegetationChemical)) : [];
        this.bloom = bloom ? bloom.map(bloomChemical => ChemicalUnitValue.createNew(bloomChemical)) : [];
        this.id = id ? id : IdGenerator.generate();
    }

    clone = () => {
        const vegetation = this.vegetation ? [...this.vegetation] : []
        const bloom = this.bloom ? [...this.bloom] : []
        return new Agriculture(this.name, vegetation, bloom, this.id)
    }

    static createNew(agriculture: Agriculture | AgricultureDTO): Agriculture {
        return new Agriculture(
            agriculture.name,
            agriculture.vegetation,
            agriculture.bloom,
            agriculture.id
        )
    }
}