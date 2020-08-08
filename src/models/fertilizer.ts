import { FertilizerEditorElement } from "./fertilizerEditorElement"
import {IdGenerator} from "../helpers/idGenerator/IdGenerator";

export class Fertilizer {
    id: string
    name: string
    composition: FertilizerEditorElement[]

    constructor(name: string, composition: FertilizerEditorElement[], id?: string) {
        this.name = name
        this.composition = composition;
        this.id = id ? id : IdGenerator.generate();
    }
}