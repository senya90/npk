import {Fertilizer} from "../../models/fertilizer";

export interface FertilizerEditorProps {
    editableFertilizer?: Fertilizer
    onSave: (fertilizer: Fertilizer) => void
    addElement: () => void
}