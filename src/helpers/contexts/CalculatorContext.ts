import React from "react";
import {Fertilizer} from "../../models/fertilizer/fertilizer";
import { Solution } from "models/solution/solution";
import { Agriculture } from "models/agriculture";
import {ChemicalComplex} from "../../models/chemicalComplex/chemicalComplex";
import {ChemicalUnit} from "../../models/chemicalUnit";

export type CalculatorContextType = {
    chemicals: ChemicalUnit[],
    onDeleteFertilizer: (fertilizerId: string, needUpdateSolutions?: boolean) => void
    onSaveFertilizer: (fertilizer: Fertilizer) => Promise<any>
    onEditFertilizer: (fertilizerId: string | undefined) => void

    onAddFertilizerToSolution: (fertilizerId: string) => void
    onSolutionUpdated: (solution: Solution) => void
    onSolutionSave: () => void
    onDeleteSolution: (solution: Solution) => void
    onEditSolution: (solution: Solution) => void

    getFertilizerById: (fertilizerId: string) => Fertilizer | undefined
    chemicalComplexes: ChemicalComplex[],
    getChemicalComplexById: (chemicalComplexId: string) => ChemicalComplex | undefined
    onChemicalComplexSaved: (savedComplexes: []) => void
    onChemicalComplexRemoved: (id: string[]) => void

    onAgricultureSelect: (agriculture: Agriculture) => void
    onUpdateAgricultures: (agricultures: Agriculture[]) => void
    onDeleteAgricultures: (agriculturesIds: string[]) => void
}

export const CalculatorContext = React.createContext<CalculatorContextType>({
    chemicals: [],
    onDeleteFertilizer(fertilizerId: string, needUpdateSolutions = false) {
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
    onDeleteSolution(solution: Solution): void {
    },
    onEditSolution(solution: Solution): void {
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
    onUpdateAgricultures(agricultures: Agriculture[]): void {
    },
    onDeleteAgricultures(agriculturesIds: string[]): void {
    }
})
