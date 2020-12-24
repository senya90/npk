import {Fertilizer} from "../../models/fertilizer";
import {Mixture} from "../../models/mixture/mixture";

export interface FertilizersProps {
    fertilizers: Fertilizer[]
    editableFertilizer?: Fertilizer
    mixture?: Mixture
}