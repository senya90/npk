import {Fertilizer} from "../../models/fertilizer";
import {Mixture} from "../../models/mixture/mixture";
import {ChemicalComplex} from "../../models/chemicalComplex/chemicalComplex";

export interface FertilizersProps {
    fertilizers: Fertilizer[]
    editableFertilizer?: Fertilizer
    mixture?: Mixture
    chemicalComplexes: ChemicalComplex[]
}