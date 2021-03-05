import React from "react";
import {Fertilizer} from "../../models/fertilizer/fertilizer";
import { Mixture } from "models/mixture/mixture";
import { Agriculture } from "models/agriculture";
import {ChemicalComplex} from "../../models/chemicalComplex/chemicalComplex";
import {ChemicalUnit} from "../../models/chemicalUnit";

export type CalculatorContextType = {
    chemicals: ChemicalUnit[],
    onDeleteFertilizer: (fertilizerId: string) => void
    onSaveFertilizer: (fertilizer: Fertilizer) => Promise<any>
    onEditFertilizer: (fertilizerId: string | undefined) => void

    onAddFertilizerToMixture: (fertilizerId: string) => void
    onMixtureUpdated: (mixture: Mixture) => void
    onMixtureSave: () => void

    getFertilizerById: (fertilizerId: string) => Fertilizer | undefined
    chemicalComplexes: ChemicalComplex[],
    getChemicalComplexById: (chemicalComplexId: string) => ChemicalComplex | undefined
    onChemicalComplexSaved: (savedComplexes: []) => void
    onChemicalComplexRemoved: (id: string[]) => void

    onAgricultureSelect: (agriculture: Agriculture) => void
    onAgriculturesUpdated: (agricultures: Agriculture[]) => void
}

export const CalculatorContext = React.createContext<CalculatorContextType>({
    chemicals: [],
    onDeleteFertilizer(fertilizerId: string) {
    },
    onSaveFertilizer(fertilizer: Fertilizer): Promise<any> {
        return Promise.resolve(undefined);
    },
    onEditFertilizer(fertilizerId: string | undefined): void {
    },

    onMixtureUpdated(mixture: Mixture): void {
    },
    onAddFertilizerToMixture(fertilizerId: string): void {
    },
    onMixtureSave(): void {
    },


    getFertilizerById(fertilizerId: string): Fertilizer | undefined {
        return undefined;
    },
    chemicalComplexes: [],
    getChemicalComplexById(chemicalComplexId: string): ChemicalComplex | undefined {
        return undefined;
    },
    onChemicalComplexSaved(savedComplexes: []): void {
    },
    onChemicalComplexRemoved(id: string[]): void {
    },


    onAgricultureSelect(agriculture: Agriculture): void {
    },
    onAgriculturesUpdated(agricultures: Agriculture[]): void {
    }
})
