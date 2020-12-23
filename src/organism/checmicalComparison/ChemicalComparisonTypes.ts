import { Agriculture } from "models/agriculture";
import {Mixture} from "../../models/mixture/mixture";
import {ChemicalUnit} from "../../models/chemicalUnit";

export interface ChemicalComparisonProps {
    activeAgriculture: Agriculture
    mixture?: Mixture
    chemicals: ChemicalUnit[]
}