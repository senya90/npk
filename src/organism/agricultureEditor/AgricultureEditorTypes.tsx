import {Agriculture} from "../../models/agriculture";
import {ChemicalUnit} from "../../models/chemicalUnit";

export interface AgricultureEditorProps {
    agriculture?: Agriculture
    onAgricultureChanged: (agriculture: Agriculture) => void
    chemicals: ChemicalUnit[]
}

export type AgricultureCollectionType = "vegetation" | "bloom"