import { Agriculture } from "models/agriculture";
import {Mixture} from "../../models/mixture/mixture";

export interface ChemicalComparisonProps {
    activeAgriculture: Agriculture
    mixture?: Mixture
}