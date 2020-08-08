import {FertilizerIngredient} from "../../../models/fertilizerIngredient";

export interface FertilizerElementProps {
    element: FertilizerIngredient
    elementsList: any // list of chemical elements
    onElementChanged: (updatedElement: FertilizerIngredient) => void
}