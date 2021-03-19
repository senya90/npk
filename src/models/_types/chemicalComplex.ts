import {ChemicalAggregate} from "../chemicalAggregate/chemicalAggregate";
import { FertilizersUsingComplexes } from "./fertilizer";

export type ChemicalComplexDTO = {
    id: string
    name: string
    chemicalAggregates: ChemicalAggregate[]
    userId?: string
}

export type DeleteComplexResponse = {
    needToConfirm: boolean
    fertilizerUsingComplexes: FertilizersUsingComplexes[],
    deletedComplexesIds: string[]
}