import {Crop} from "models/crop";
import {chemicalUnitsMock} from "./chemicalMock";
import { ChemicalUnitValue } from "models/chemicalUnitValue/chemicalUnitValue";

export const cropsMock: Crop[] = [
    new Crop(
        'Огурцы',
        [
            new ChemicalUnitValue(chemicalUnitsMock.K, 55),
            new ChemicalUnitValue(chemicalUnitsMock.S, 0.2),
            new ChemicalUnitValue(chemicalUnitsMock.N, 10),
        ],
        [],
        '62629f03-e79c-43d8-ac47-98343c658653'
    ),
    new Crop(
        'Помидоры',
        [
            new ChemicalUnitValue(chemicalUnitsMock.P, 20.5),
            new ChemicalUnitValue(chemicalUnitsMock.K, 100),
            new ChemicalUnitValue(chemicalUnitsMock.Fe, 0.002)
        ],
        [
            new ChemicalUnitValue(chemicalUnitsMock.K, 20.20),
            new ChemicalUnitValue(chemicalUnitsMock.B, 0.009),
        ],
        '9e3d97ef-bcd8-4502-8faa-87ae95b1c5a5'
    )
]