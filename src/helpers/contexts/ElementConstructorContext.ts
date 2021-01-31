import React from "react";
import {ChemicalAggregate} from "../../models/chemicalAggregate";
import {ChemicalAtom} from "../../models/chemicalAtom";

export type ElementConstructorContextType = {
    onChangeAggregationMultiplier: (updatedAggregation: ChemicalAggregate, multiplier: number) => void

    onAddAtom: (updatedAggregation: ChemicalAggregate) => void
    onChangeAtom: (aggregation: ChemicalAggregate, chemicalId: string) => void
    onChangeAtomCount: (aggregation: ChemicalAggregate, updatedAtom: ChemicalAtom, updatedCount: number) => void
    onRemoveAtom: (aggregation: ChemicalAggregate, removedAtom: ChemicalAtom) => void
}

export const ElementConstructorContext = React.createContext<ElementConstructorContextType>({
    onAddAtom(updatedAggregation: ChemicalAggregate): void {
    }, onChangeAggregationMultiplier(updatedAggregation: ChemicalAggregate, multiplier: number): void {
    }, onChangeAtom(aggregation: ChemicalAggregate, chemicalId: string): void {
    }, onChangeAtomCount(aggregation: ChemicalAggregate, updatedAtom: ChemicalAtom, updatedCount: number): void {
    }, onRemoveAtom(aggregation: ChemicalAggregate, removedAtom: ChemicalAtom): void {
    }

})