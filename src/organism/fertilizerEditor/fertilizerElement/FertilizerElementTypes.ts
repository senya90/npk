import {FertilizerIngredient} from "../../../models/fertilizerIngredient";
import {ChemicalComplex} from "../../../models/chemicalComplex/chemicalComplex";

export interface FertilizerElementProps {
    chemical: FertilizerIngredient
    chemicalComplexList: ChemicalComplex[]
    onChemicalChanged: (updatedElement: FertilizerIngredient) => void
}