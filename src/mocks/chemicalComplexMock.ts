import { ChemicalComplex } from "models/chemicalComplex";
import { chemicalUnitsMock } from "./chemicalMock";
import { ChemicalAtom } from "models/chemicalAtom";

export const chemicalComplexMock: ChemicalComplex[] = [
    new ChemicalComplex(
        'N',
        [
            new ChemicalAtom(chemicalUnitsMock[0])
        ],
        '1N'
    ),

    new ChemicalComplex(
        'P',
        [
            new ChemicalAtom(chemicalUnitsMock[1])
        ],
        '2P'
    ),

    new ChemicalComplex(
        'K',
        [
            new ChemicalAtom(chemicalUnitsMock[2])
        ],
        '3K'
    ),

    new ChemicalComplex(
        'Ca',
        [
            new ChemicalAtom(chemicalUnitsMock[3])
        ],
        '4Ca'
    ),
    new ChemicalComplex(
        'Mg',
        [
            new ChemicalAtom(chemicalUnitsMock[4])
        ],
        '5Mg'
    ),
    new ChemicalComplex(
        'S',
        [
            new ChemicalAtom(chemicalUnitsMock[5])
        ],
        '6S'
    ),
    new ChemicalComplex(
        'B',
        [
            new ChemicalAtom(chemicalUnitsMock[6])
        ],
        '7B'
    ),
    new ChemicalComplex(
        'Fe',
        [
            new ChemicalAtom(chemicalUnitsMock[7])
        ],
        '8Fe'
    ),
    new ChemicalComplex(
        'MgSO4',
        [
            new ChemicalAtom(chemicalUnitsMock[4], 1),
            new ChemicalAtom(chemicalUnitsMock[5], 1),
            new ChemicalAtom(chemicalUnitsMock[12], 4),
        ],
        '9MgSO4'
    ),
]