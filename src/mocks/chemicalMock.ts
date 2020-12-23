import {ChemicalUnit} from "../models/chemicalUnit";
import { Utils } from "helpers/utils";


export const chemicalUnitsMock = {
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
    Na: new ChemicalUnit('Na', 22.99, 'd022633a-e5e4-42d6-8ba4-21b042adb24c'),
    Co: new ChemicalUnit('Co', 58.933, 'ef4259c7-c30f-45f6-a5cb-72a27a6a0018'),
    Cl: new ChemicalUnit('Cl', 35.453, 'aaeb5382-7b5a-4b1d-8dd9-55f9e2acc640'),
    I: new ChemicalUnit('I', 126.906, '1a23563f-370f-446d-b0bf-efd9294dcf96'),

    Ni: new ChemicalUnit('Ni', 58.7, '529dbcf9-819a-475a-9bc7-87e9d6b977eb'),
    Se: new ChemicalUnit('Se', 78.96, 'f65dcb1d-474b-4a78-b39c-1b19c3bd0512'),
    Br: new ChemicalUnit('Br', 79.904, '33e8ce66-c475-45b8-a963-2811eaecd226'),
    Al: new ChemicalUnit('Al', 26.092, 'efda6d17-fd22-45dd-aeb5-76696d8635cf'),
    V: new ChemicalUnit('V', 50.941, 'e075dda6-57d5-4135-bcb1-4c9bf356bd19'),

    W: new ChemicalUnit('W', 183.85, '368687f3-8899-4820-8186-f4bd3f6b77e4'),
    Li: new ChemicalUnit('Li', 6.941, 'd5ceb6d4-c737-4d9e-b248-ea2d48c19fe6'),
    Cr: new ChemicalUnit('Cr', 51.996, '843fc241-d716-436e-82d7-e8f817239af0'),
    Rb: new ChemicalUnit('Rb', 85.468, '43c83e67-09c3-46d9-b9f0-0788db9a0bed'),

    O: new ChemicalUnit('O', 15.9994, '8bb8b15f-411e-4e1c-8033-bf979bec5b07',),
    H: new ChemicalUnit('H', 1.00797, 'ac4dd1de-da32-488c-bb12-03fb9b1c23f7'),
}

export const chemicalUnitsMockArray = (): ChemicalUnit[] => {
    return Utils.objectToArray(chemicalUnitsMock)
}
