import { IdGenerator } from "helpers/idGenerator/IdGenerator";

export class FertilizerEditorElement {
    id: string;
    name: string;
    value: number;

    constructor(name = '', value = 0, id?: string) {
        this.name = name;
        this.value = value;
        this.id = id ? id : IdGenerator.generate();
    }
};