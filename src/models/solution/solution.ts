import {Dosage} from "../dosage";
import {IdGenerator} from "../../helpers/idGenerator/IdGenerator";
import { Fertilizer } from "../fertilizer/fertilizer";
import { ChemicalUnitValue } from "../chemicalUnitValue/chemicalUnitValue";
import { Weight } from "../weight";
import { AtomsProportionCalculator } from "../proportionCalculator";

export class Solution {
    dosages: Dosage[]
    name: string
    id: string

    constructor(name = '', dosages?: Dosage[], id?: string) {
        this.name = name
        this.dosages = dosages ? dosages : [];
        this.id = id ? id : IdGenerator.generate()
    }

    static getActualMixture = (fromMixture: Solution | undefined) => {
        let actualMixture = new Solution()
        if (fromMixture) {
            const {name, dosages, id} = fromMixture
            actualMixture = new Solution(name, dosages, id)
        }
        return actualMixture
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