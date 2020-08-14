import {Dosage} from "../../models/dosage";
import {Fertilizer} from "../../models/fertilizer";

export interface DosageViewProps {
    dosage: Dosage
    onDosageValueIncrease?: () => void
    onDosageValueDecrease?: () => void
    deleteFertilizerFromMixture: (fertilizer: Fertilizer) => void
}