import React from "react";
import {Fertilizer} from "../../models/fertilizer";
import { Mixture } from "models/mixture";

export type CalculatorContextType = {
    onDeleteFertilizer: (fertilizerId: string) => boolean
    onSaveFertilizer: (fertilizer: Fertilizer) => Fertilizer
    onEditFertilizer: (fertilizerId: string) => Fertilizer

    onAddFertilizerToMixture: (fertilizerId: string) => void
    onMixtureUpdated: (mixture: Mixture) => void

    getFertilizerById: (fertilizerId: string) => Fertilizer | undefined
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

    getFertilizerById(fertilizerId: string): Fertilizer | undefined {
        return undefined;
    }
})
