import {Dosage} from "../../models/dosage";

export interface DosageViewProps {
    dosage: Dosage
    onDosageValueIncrease?: () => void
    onDosageValueDecrease?: () => void
}