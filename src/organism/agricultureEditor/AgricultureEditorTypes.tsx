import {Agriculture} from "../../models/agriculture";

export interface AgricultureEditorProps {
    agriculture?: Agriculture
    onAgricultureChanged: (agriculture: Agriculture) => void
}