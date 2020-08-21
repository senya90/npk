import { Crop } from "models/crop";
import {Mixture} from "../../models/mixture";

export interface ChemicalComparisonProps {
    activeCrop: Crop
    mixture?: Mixture
}