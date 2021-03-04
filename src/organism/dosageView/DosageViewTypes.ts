import {Dosage} from "../../models/dosage";
import {Fertilizer} from "../../models/fertilizer/fertilizer";

export interface DosageViewProps {
    dosage: Dosage
    onDosageValueIncrease?: () => void
    onDosageValueDecrease?: () => void
    deleteFertilizerFromMixture: (fertilizer: Fertilizer) => void
    onDosageChanged: (dosage: Dosage) => void
}