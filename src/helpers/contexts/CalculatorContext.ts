import React from "react";
import {Fertilizer} from "../../models/fertilizer/fertilizer";
import { Solution } from "models/solution/solution";
import { Agriculture } from "models/agriculture";
import {ChemicalComplex} from "../../models/chemicalComplex/chemicalComplex";
import {ChemicalUnit} from "../../models/chemicalUnit";

export type CalculatorContextType = {
    chemicals: ChemicalUnit[],
    onDeleteFertilizer: (fertilizerId: string) => void
    onSaveFertilizer: (fertilizer: Fertilizer) => Promise<any>
    onEditFertilizer: (fertilizerId: string | undefined) => void

    onAddFertilizerToSolution: (fertilizerId: string) => void
    onSolutionUpdated: (solution: Solution) => void
    onSolutionSave: () => void

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

    onSolutionUpdated(solution: Solution): void {
    },
    onAddFertilizerToSolution(fertilizerId: string): void {
    },
    onSolutionSave(): void {
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
