import { Agriculture } from "models/agriculture";
import {ChemicalUnit} from "../../models/chemicalUnit";

export interface AgriculturesProps {
    agricultures: Agriculture[]
    activeAgriculture: Agriculture
    onAgriculturesAdd: (agricultures: Agriculture[]) => void
    chemicals: ChemicalUnit[]
}