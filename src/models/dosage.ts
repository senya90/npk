import {Fertilizer} from "./fertilizer/fertilizer";
import {IdGenerator} from "../helpers/idGenerator/IdGenerator";
import { FertilizerDTO } from "./_types/fertilizer";
import {ChemicalComplex} from "./chemicalComplex/chemicalComplex";
import {FertilizerIngredient} from "./fertilizer/fertilizerIngredient";

export type DosageDTO = {
    id: string
    valueGram: number
    fertilizer: FertilizerDTO | Fertilizer
}

export class Dosage {
    id: string
    fertilizer: Fertilizer
    valueGram: number

    constructor(fertilizer: Fertilizer, value = 0, id = IdGenerator.generate()) {
        this.id = id
        this.fertilizer = Fertilizer.createNew(fertilizer)
        this.valueGram = value;
    }

    static createNew(dosage: DosageDTO | Dosage): Dosage {
        return new Dosage(dosage.fertilizer, dosage.valueGram, dosage.id)
    }

    subtractPreviouslyUsedIngredients(updatedComplexList: ChemicalComplex[]): Dosage {
        const dosageIngredients: FertilizerIngredient[] = this.fertilizer.ingredients.map(ingredient => ingredient)
        const included: FertilizerIngredient[] = []

        for (let i = 0; i < dosageIngredients.length; i++) {
            for (let j = 0; j < updatedComplexList.length; j++) {
                if (dosageIngredients[i].chemicalComplex.id === updatedComplexList[j].id) {
                    included.push(new FertilizerIngredient(
                        updatedComplexList[j],
                        dosageIngredients[i].valuePercent,
                        dosageIngredients[i].id
                    ))
                    break
                }
            }
        }
        const newFertilizer = new Fertilizer(this.fertilizer.name, included, this.fertilizer.id, this.fertilizer.timestamp, this.fertilizer.orderNumber)
        return new Dosage(newFertilizer, this.valueGram, this.id)
    }
}