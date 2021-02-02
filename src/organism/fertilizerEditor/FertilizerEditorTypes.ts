import {Fertilizer} from "../../models/fertilizer";
import {ChemicalComplex} from "../../models/chemicalComplex/chemicalComplex";

export interface FertilizerEditorProps {
    editableFertilizer?: Fertilizer
    onSave: (fertilizer: Fertilizer) => void
    addElement: () => void
    chemicalComplexes: ChemicalComplex[]
}