import {FertilizerIngredient} from "../../../../models/fertilizer/fertilizerIngredient";
import {ChemicalComplex} from "../../../../models/chemicalComplex/chemicalComplex";

export interface FertilizerElementProps {
    ingredient: FertilizerIngredient
    chemicalComplexList: ChemicalComplex[]
    onChemicalChanged: (updatedElement: FertilizerIngredient) => void
    onDeleteIngredient: (deletedIngredient: FertilizerIngredient) => void
}