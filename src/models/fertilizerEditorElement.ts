import { IdGenerator } from "helpers/idGenerator/IdGenerator";

export class FertilizerEditorElement {
    id: string;
    chemicalId: string;
    value: number;

    constructor(chemicalId = '', value = 0, id?: string) {
        this.chemicalId = chemicalId;
        this.value = value;
        this.id = id ? id : IdGenerator.generate();
    }
};