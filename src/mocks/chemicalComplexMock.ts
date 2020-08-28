import { ChemicalComplex } from "models/chemicalComplex/chemicalComplex";
import { chemicalUnitsMock } from "./chemicalMock";
import { ChemicalAtom } from "models/chemicalAtom";
import { ChemicalAggregate } from "../models/chemicalAggregate";
import { Utils } from "helpers/utils";

export const chemicalComplexMock = {
    N: new ChemicalComplex(
        'N',
        [
            new ChemicalAggregate(
                [new ChemicalAtom(chemicalUnitsMock.N)]
            )
        ],
        '1N'
    ),
    P: new ChemicalComplex(
        'P',
        [
            new ChemicalAggregate(
                [new ChemicalAtom(chemicalUnitsMock.P)]
            )
        ],
        '2P'
    ),
    K: new ChemicalComplex(
        'K',
        [
            new ChemicalAggregate(
                [new ChemicalAtom(chemicalUnitsMock.K)]
            )
        ],
        '3K'
    ),
    Ca: new ChemicalComplex(
        'Ca',
        [
            new ChemicalAggregate(
                [new ChemicalAtom(chemicalUnitsMock.Ca)]
            )
        ],
        '4Ca'
    ),
    Mg: new ChemicalComplex(
        'Mg',
        [
            new ChemicalAggregate(
                [new ChemicalAtom(chemicalUnitsMock.Mg)]
            )
        ],
        '5Mg'
    ),
    S: new ChemicalComplex(
        'S',
        [
            new ChemicalAggregate(
                [new ChemicalAtom(chemicalUnitsMock.S)]
            )
        ],
        '6S'
    ),
    B: new ChemicalComplex(
        'B',
        [
            new ChemicalAggregate(
                [new ChemicalAtom(chemicalUnitsMock.B)]
            )
        ],
        '7B'
    ),
    Fe: new ChemicalComplex(
        'Fe',
        [
            new ChemicalAggregate(
                [new ChemicalAtom(chemicalUnitsMock.Fe)]
            )
        ],
        '8Fe'
    ),
    MgSO4:   new ChemicalComplex(
        'MgSO4',
        [
            new ChemicalAggregate(
                [
                    new ChemicalAtom(chemicalUnitsMock.Mg),
                    new ChemicalAtom(chemicalUnitsMock.S),
                    new ChemicalAtom(chemicalUnitsMock.O, 4),
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
                    new ChemicalAtom(chemicalUnitsMock.Mg),
                    new ChemicalAtom(chemicalUnitsMock.S),
                    new ChemicalAtom(chemicalUnitsMock.O, 4),
                ]
            ),
            new ChemicalAggregate(
                [
                    new ChemicalAtom(chemicalUnitsMock.H, 2),
                    new ChemicalAtom(chemicalUnitsMock.O)
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
