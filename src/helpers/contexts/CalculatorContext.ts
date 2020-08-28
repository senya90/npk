import React from "react";
import {Fertilizer} from "../../models/fertilizer";
import { Mixture } from "models/mixture/mixture";
import { Crop } from "models/crop";
import {ChemicalComplex} from "../../models/chemicalComplex/chemicalComplex";

export type CalculatorContextType = {
    onDeleteFertilizer: (fertilizerId: string) => boolean
    onSaveFertilizer: (fertilizer: Fertilizer) => Fertilizer
    onEditFertilizer: (fertilizerId: string) => Fertilizer

    onAddFertilizerToMixture: (fertilizerId: string) => void
    onMixtureUpdated: (mixture: Mixture) => void
    onMixtureSave: () => void

    getFertilizerById: (fertilizerId: string) => Fertilizer | undefined
    getChemicalComplexById: (chemicalComplexId: string) => ChemicalComplex | undefined

    onCropSelect: (crop: Crop) => void
}

export const CalculatorContext = React.createContext<CalculatorContextType>({
    onDeleteFertilizer(fertilizerId: string): boolean {
        return false;
    },
    onSaveFertilizer(fertilizer: Fertilizer): Fertilizer {
        return new Fertilizer('template', []);
    },
    onEditFertilizer(fertilizerId: string): Fertilizer {
        return new Fertilizer('template', []);
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
    getChemicalComplexById(chemicalComplexId: string): ChemicalComplex | undefined {
        return undefined;
    },


    onCropSelect(crop: Crop): void {
    }
})
