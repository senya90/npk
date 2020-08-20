import {Crop} from "models/crop";
import {chemicalUnitsMock} from "./chemicalMock";

export const cropsMock: Crop[] = [
    new Crop(
        'Огурцы',
        [
            {chemicalUnit: chemicalUnitsMock[0], value: 10},
            {chemicalUnit: chemicalUnitsMock[2], value: 55},
            {chemicalUnit: chemicalUnitsMock[5], value: 0.2},
        ],
        [],
        '62629f03-e79c-43d8-ac47-98343c658653'
    ),
    new Crop(
        'Помидоры',
        [
            {chemicalUnit: chemicalUnitsMock[1], value: 20.5},
            {chemicalUnit: chemicalUnitsMock[2], value: 100},
            {chemicalUnit: chemicalUnitsMock[7], value: 0.002},
        ],
        [
            {chemicalUnit: chemicalUnitsMock[2], value: 20.20},
            {chemicalUnit: chemicalUnitsMock[6], value: 0.009},
        ],
        '9e3d97ef-bcd8-4502-8faa-87ae95b1c5a5'
    )
]