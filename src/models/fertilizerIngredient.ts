import { IdGenerator } from "helpers/idGenerator/IdGenerator";

export class FertilizerIngredient {
    id: string;
    chemicalComplexId: string;
    valuePercent: number;

    constructor(chemicalComplexId = '', value = 0, id?: string) {
        this.chemicalComplexId = chemicalComplexId;
        this.valuePercent = value;
        this.id = id ? id : IdGenerator.generate();
    }
}
