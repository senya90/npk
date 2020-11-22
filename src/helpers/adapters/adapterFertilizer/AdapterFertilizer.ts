import { SelectOption } from "atom/select/SelectTypes"
import {ChemicalComplex} from "models/chemicalComplex/chemicalComplex";
import { isArray } from "helpers/utils";

export class AdapterFertilizer {
    static complexToSelect(elements: ChemicalComplex[]): SelectOption[] {
        if (!isArray(elements)) {
            return []
        }

        return elements.map((element) => {
            const option: SelectOption = {
                value: element.id,
                label: element.name
            }
            return option
        })
    }
}