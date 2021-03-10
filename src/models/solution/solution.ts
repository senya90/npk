import {Dosage} from "../dosage";
import {IdGenerator} from "../../helpers/idGenerator/IdGenerator";
import { Fertilizer } from "../fertilizer/fertilizer";
import { ChemicalUnitValue } from "../chemicalUnitValue/chemicalUnitValue";
import { Weight } from "../weight";
import { AtomsProportionCalculator } from "../proportionCalculator";

export type SolutionDTO = {
    id: string
    name: string
    dosages: Dosage[]
    orderNumber: number | null
    timestamp: number
}

export class Solution {
    dosages: Dosage[]
    name: string
    id: string
    orderNumber: number | null
    timestamp: number | null

    constructor(solution?: SolutionDTO | Solution) {
        if (solution) {
            this.name = solution.name ? solution.name : ''
            this.dosages = solution.dosages ? solution.dosages.map(dosage => Dosage.createNew(dosage)) : [];
            this.id = solution.id ? solution.id : IdGenerator.generate()
            this.orderNumber = solution.orderNumber
            this.timestamp = solution.timestamp
            return
        }

        this.name = ''
        this.dosages = []
        this.id = IdGenerator.generate()
        this.orderNumber = null
        this.timestamp = null
    }

    static getActualSolution = (fromSolution: Solution | undefined) => {
        let actualSolution = new Solution()
        if (fromSolution) {
            actualSolution = new Solution(fromSolution)
        }
        return actualSolution
    }

    addFertilizer = (fertilizer: Fertilizer) => {
        this.addDosageItem(fertilizer)
    }

    private addDosageItem = (fertilizer: Fertilizer) => {
        this.dosages.push(new Dosage(fertilizer))
    }

    isAvailableForFertilizer = (fertilizer?: Fertilizer): boolean => {
        if (!this || this.dosages.length === 0 || !fertilizer) {
            return true
        }

        for (let i = 0; i < this.dosages.length; i++) {
            if (this.dosages[i].fertilizer.id === fertilizer.id) {
                return false
            }
        }
        return true
    }

    toChemicals = (): ChemicalUnitValue[] => {
        const allChemicals: ChemicalUnitValue[] = []

        this.dosages.forEach(dosage => {
            dosage.fertilizer.ingredients.forEach(ingredient => {

                if (ingredient.chemicalComplex) {
                    let atomsProportions = ingredient.chemicalComplex.toAtomsProportions()
                    const miligrams = Weight.gramToMilligram(dosage.valueGram)

                    let atomsCalculator = new AtomsProportionCalculator(atomsProportions)
                    atomsCalculator.correctDecimalByAggregate(ingredient.percentToDecimal())
                    const chemicalsWeights: ChemicalUnitValue[] = atomsCalculator.toChemicalValueByMiligrams(miligrams)
                    
                    const mergedChemicals = ChemicalUnitValue.merge(chemicalsWeights)
                    allChemicals.push(...mergedChemicals)
                }
            })
        })

        const merged = ChemicalUnitValue.merge(allChemicals)
        const normalized = merged.map(chemicalUnitValue => chemicalUnitValue.normalizeValueForView())
        return normalized
    }
}