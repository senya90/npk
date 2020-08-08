import {Fertilizer} from "../../models/fertilizer";

export interface FertilizerEditorProps {
    onSaveFertilizer: (fertilizer: Fertilizer) => void
}