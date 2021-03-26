import {Fertilizer} from "../../models/fertilizer/fertilizer";
import {Solution} from "../../models/solution/solution";
import {ChemicalComplex} from "../../models/chemicalComplex/chemicalComplex";

export interface FertilizersProps {
    fertilizers: Fertilizer[]
    editableFertilizer?: Fertilizer
    solution?: Solution
    chemicalComplexes: ChemicalComplex[]
    className?: string
}