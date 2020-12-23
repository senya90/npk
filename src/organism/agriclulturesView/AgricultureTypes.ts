import { Agriculture } from "models/agriculture";

export interface AgriculturesProps {
    agricultures: Agriculture[]
    activeAgriculture: Agriculture
    onAgriculturesUpdated: (agricultures: Agriculture[]) => void
}