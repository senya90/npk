import { Crop } from "models/crop";
import {Mixture} from "../../models/mixture/mixture";

export interface ChemicalComparisonProps {
    activeCrop: Crop
    mixture?: Mixture
}