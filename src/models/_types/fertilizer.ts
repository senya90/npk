import {FertilizerIngredient} from "../fertilizer/fertilizerIngredient";
import {ChemicalComplex} from "../chemicalComplex/chemicalComplex";
import { ChemicalComplexDTO } from "./chemicalComplex";

export type FertilizerDTO = {
    id: string
    name: string
    ingredients: FertilizerIngredient[]
    timestamp: number
    orderNumber: number | null
}

export type FertilizerIngredientDTO = {
    id: string
    chemicalComplex: ChemicalComplex,
    valuePercent: number
}

export type FertilizersUsingComplexes = {
    chemicalComplex: ChemicalComplexDTO,
    fertilizers: FertilizerDTO[]
}