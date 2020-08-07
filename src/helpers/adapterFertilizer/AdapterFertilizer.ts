import { SelectOption } from "atom/select/SelectTypes"

export class AdapterFertilizer {
    static toSelect(elements: any): SelectOption[] {
        return elements.map((element: any) => {
            const option: SelectOption = {
                value: element.id,
                label: element.name
            }
            return option
        })
    }
}