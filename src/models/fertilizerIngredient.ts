import { IdGenerator } from "helpers/idGenerator/IdGenerator";

export class FertilizerIngredient {
    id: string;
    chemicalComplexId: string;
    valuePercent: number;

    constructor(chemicalId = '', value = 0, id?: string) {
        this.chemicalComplexId = chemicalId;
        this.valuePercent = value;
        this.id = id ? id : IdGenerator.generate();
    }
}


// export class FertilizerIngredient {
//     id: string;
//     chemicalId: string;
//     value: number;
//     chemicalComposition: []
//
//     constructor(chemicalId = '', value = 0, chemicalComposition: [], id?: string) {
//         this.chemicalId = chemicalId;
//         this.value = value;
//         this.chemicalComposition = chemicalComposition
//         this.id = id ? id : IdGenerator.generate();
//     }
// }