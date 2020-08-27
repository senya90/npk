import { ChemicalComplex } from "models/chemicalComplex";
import { chemicalUnitsMock } from "./chemicalMock";
import { ChemicalAtom } from "models/chemicalAtom";
import { ChemicalAggregate } from "../models/chemicalAggregate";
import { Utils } from "helpers/utils";

export const chemicalComplexMock = {
    N: new ChemicalComplex(
        'N',
        [
            new ChemicalAggregate(
                [new ChemicalAtom(chemicalUnitsMock[0])]
            )
        ],
        '1N'
    ),
    P: new ChemicalComplex(
        'P',
        [
            new ChemicalAggregate(
                [new ChemicalAtom(chemicalUnitsMock[1])]
            )
        ],
        '2P'
    ),
    K: new ChemicalComplex(
        'K',
        [
            new ChemicalAggregate(
                [new ChemicalAtom(chemicalUnitsMock[2])]
            )
        ],
        '3K'
    ),
    Ca: new ChemicalComplex(
        'Ca',
        [
            new ChemicalAggregate(
                [new ChemicalAtom(chemicalUnitsMock[3])]
            )
        ],
        '4Ca'
    ),
    Mg: new ChemicalComplex(
        'Mg',
        [
            new ChemicalAggregate(
                [new ChemicalAtom(chemicalUnitsMock[4])]
            )
        ],
        '5Mg'
    ),
    S: new ChemicalComplex(
        'S',
        [
            new ChemicalAggregate(
                [new ChemicalAtom(chemicalUnitsMock[5])]
            )
        ],
        '6S'
    ),
    B: new ChemicalComplex(
        'B',
        [
            new ChemicalAggregate(
                [new ChemicalAtom(chemicalUnitsMock[6])]
            )
        ],
        '7B'
    ),
    Fe: new ChemicalComplex(
        'Fe',
        [
            new ChemicalAggregate(
                [new ChemicalAtom(chemicalUnitsMock[7])]
            )
        ],
        '8Fe'
    ),
    MgSO4:   new ChemicalComplex(
        'MgSO4',
        [
            new ChemicalAggregate(
                [
                    new ChemicalAtom(chemicalUnitsMock[4]),
                    new ChemicalAtom(chemicalUnitsMock[5]),
                    new ChemicalAtom(chemicalUnitsMock[12], 4),
                ]
            )
    
        ],
        '9MgSO4'
    ),
    MgSO47H2O: 
    new ChemicalComplex(
        'MgSO4 * 7H2O',
        [
            new ChemicalAggregate(
                [
                    new ChemicalAtom(chemicalUnitsMock[4]),
                    new ChemicalAtom(chemicalUnitsMock[5]),
                    new ChemicalAtom(chemicalUnitsMock[12], 4),
                ]
            ),
            new ChemicalAggregate(
                [
                    new ChemicalAtom(chemicalUnitsMock[13], 2),
                    new ChemicalAtom(chemicalUnitsMock[12])
                ],
                7
            )
        ],
        '10MgSO47H2O'
    )
}

export const chemicalComplexMockArray = (): ChemicalComplex[] => {
    return Utils.objectToArray(chemicalComplexMock)    
}
