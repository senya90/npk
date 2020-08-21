import {FertilizerIngredient} from "../../../models/fertilizerIngredient";

export interface FertilizerElementProps {
    chemical: FertilizerIngredient
    chemicalList: any // list of chemical elements
    onChemicalChanged: (updatedElement: FertilizerIngredient) => void
}