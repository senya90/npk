import {Dosage, DosageDTO} from "../dosage/dosage";
import {IdGenerator} from "../../helpers/idGenerator/IdGenerator";
import { Fertilizer } from "../fertilizer/fertilizer";
import { ChemicalUnitValue } from "../chemicalUnitValue/chemicalUnitValue";
import { Weight } from "../weight";
import { AtomsProportionCalculator } from "../proportionCalculator";
import {FertilizerDTO} from "../_types/fertilizer";
import {isEmptyArray} from "../../helpers/utils";

export type SolutionDTO = {
    id: string
    name: string
    dosages: Dosage[]
    orderNumber: number | null
    timestamp: number | null
}

export type SolutionsUsingFertilizer = {
    fertilizer: FertilizerDTO,
    solutions: SolutionDTO[]
}

export class Solution {
    dosages: Dosage[]
    name: string
    id: string
    orderNumber: number | null
    timestamp: number | null

    constructor(solution?: SolutionDTO | Solution) {
        if (solution) {
            this.name = solution.name
            this.dosages = solution.dosages.map(dosage => Dosage.createNew(dosage))
            this.id = solution.id
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
        return merged.map(chemicalUnitValue => chemicalUnitValue.normalizeValueForView())
    }

    removeFertilizer(fertilizerId: string): Solution {
        const dosagesWithoutDeletedFertilizer = this.dosages.filter(dosage => dosage.fertilizer.id !== fertilizerId)

        return new Solution({
            id: this.id,
            name: this.name,
            dosages: dosagesWithoutDeletedFertilizer,
            orderNumber: this.orderNumber,
            timestamp: this.timestamp
        })
    }

    updateFertilizers(updatedFertilizers: FertilizerDTO[]): Solution {
        if (isEmptyArray(updatedFertilizers)) {
            return new Solution({
                id: this.id,
                name: this.name,
                dosages: [...this.dosages],
                orderNumber: this.orderNumber,
                timestamp: this.timestamp
            })
        }

        const dosagesWithUpdated: Dosage[] = []
        const dosages = this.dosages

        for (let i = 0; i < dosages.length; i++) {
            let include: FertilizerDTO | undefined;

            for (let j = 0; j < updatedFertilizers.length; j++) {
                if (dosages[i].fertilizer.id === updatedFertilizers[j].id) {
                    include = updatedFertilizers[j]
                    break;
                }
            }

            if (include) {
                const updatedDosage: DosageDTO = {
                    id: dosages[i].id,
                    valueGram: dosages[i].valueGram,
                    fertilizer: include
                }
                dosagesWithUpdated.push(Dosage.createNew(updatedDosage))
            } else {
                dosagesWithUpdated.push(dosages[i])
            }
        }

        return new Solution({
            id: this.id,
            name: this.name,
            dosages: dosagesWithUpdated,
            orderNumber: this.orderNumber,
            timestamp: this.timestamp
        })
    }
}