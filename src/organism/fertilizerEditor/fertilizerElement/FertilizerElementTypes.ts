import {FertilizerEditorElement} from "../../../models/fertilizerEditorElement";

export interface FertilizerElementProps {
    element: FertilizerEditorElement
    elementsList: any // list of chemical elements
    onElementChanged: (updatedElement: FertilizerEditorElement) => void
}