import React from "react";
import {ChemicalAggregate} from "../../models/chemicalAggregate";
import {ChemicalAtom} from "../../models/chemicalAtom";
import {ChemicalComplex} from "../../models/chemicalComplex/chemicalComplex";
import {FertilizersUsingComplexes} from "../../models/_types/fertilizer";

export type ElementConstructorContextType = {
    onChangeAggregationMultiplier: (updatedAggregation: ChemicalAggregate, multiplier: number) => void
    onEditComplex: (complex: ChemicalComplex) => void

    onAddAtom: (updatedAggregation: ChemicalAggregate) => void
    onChangeAtom: (aggregation: ChemicalAggregate, updatedAtom: ChemicalAtom, chemicalId: string) => void
    onChangeAtomCount: (aggregation: ChemicalAggregate, updatedAtom: ChemicalAtom, updatedCount: number) => void
    onRemoveAtom: (aggregation: ChemicalAggregate, removedAtom: ChemicalAtom) => void
    onRemoveAggregation: (aggregation: ChemicalAggregate) => void
    onRemoveComplex: (chemicalComplex: ChemicalComplex) => void
}

export const ElementConstructorContext = React.createContext<ElementConstructorContextType>({
    onChangeAggregationMultiplier(updatedAggregation: ChemicalAggregate, multiplier: number): void {
    },
    onEditComplex(complex: ChemicalComplex): void {
    },

    onAddAtom(updatedAggregation: ChemicalAggregate): void {
    },
    onChangeAtom(aggregation: ChemicalAggregate, updatedAtom: ChemicalAtom, chemicalId: string): void {
    },
    onChangeAtomCount(aggregation: ChemicalAggregate, updatedAtom: ChemicalAtom, updatedCount: number): void {
    },
    onRemoveAtom(aggregation: ChemicalAggregate, removedAtom: ChemicalAtom): void {
    },
    onRemoveAggregation(aggregation: ChemicalAggregate): void {
    },
    onRemoveComplex(chemicalComplex: ChemicalComplex): void {
    }

})