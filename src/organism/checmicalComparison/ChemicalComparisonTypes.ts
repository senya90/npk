import { Agriculture } from "models/agriculture";
import {Solution} from "../../models/solution/solution";
import {ChemicalUnit} from "../../models/chemicalUnit";

export interface ChemicalComparisonProps {
    activeAgriculture: Agriculture
    mixture?: Solution
    chemicals: ChemicalUnit[]
}