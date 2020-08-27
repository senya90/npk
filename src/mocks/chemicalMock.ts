import {ChemicalUnit} from "../models/chemicalUnit";
import { Utils } from "helpers/utils";

export const chemicalUnitsMock: any = {
    N: new ChemicalUnit('N', 14.0067, '8dfe0460-bb09-4366-89ea-4df513016ae8'),
    P: new ChemicalUnit('P', 30.9738, 'e10f2d2e-33ba-4cf8-8af3-b0ea15368c36'),
    K: new ChemicalUnit('K', 39.102, 'b6b1910c-a401-4554-86df-d0781406ca37'),
    Ca: new ChemicalUnit('Ca', 40.08, 'eed78e69-615e-4c2c-802c-c72abd73c4c5'),
    Mg: new ChemicalUnit('Mg', 24.305, 'd32de583-2218-4ece-b378-8a6c4d8ebe2b'),

    S: new ChemicalUnit('S', 32.064, '79afd82d-7eac-4a0f-bda8-17b4279c2681'),
    B: new ChemicalUnit('B', 10.811, '9ac7e496-6077-46bd-9ce2-e0abe29ef6cb'),
    Fe: new ChemicalUnit('Fe', 55.847, '4e0efe6f-8b49-4092-b1a7-3a190d4f2a17'),
    Mn: new ChemicalUnit('Mn', 54.9380, '63c0ffb9-7b4e-4322-98ea-40f0c20df87d'),
    Zn: new ChemicalUnit('Zn', 65.37, '44badaa5-03f4-4ab9-a9bd-6829cf84bda6'),
    
    Cu: new ChemicalUnit('Cu', 63.546, 'f3a08276-3d36-431c-91f3-20a8ddf88a71'),
    Mo: new ChemicalUnit('Mo', 95.94, 'e59cabce-d76f-45f5-a418-7593a3ba26cd'),
    O: new ChemicalUnit('O', 15.9994, '8bb8b15f-411e-4e1c-8033-bf979bec5b07',),
    H: new ChemicalUnit('H', 1.00797, 'ac4dd1de-da32-488c-bb12-03fb9b1c23f7'),
}

export const chemicalUnitsMockArray = (): ChemicalUnit[] => {
    return Utils.objectToArray(chemicalUnitsMock)
}
