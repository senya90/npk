import {Fertilizer} from "../models/fertilizer";
import {FertilizerIngredient} from "../models/fertilizerIngredient";
import { chemicalComplexMock } from "./chemicalComplexMock";

export const fertilizersMock: Fertilizer[] = [
    new Fertilizer(
        'Удобрение 1',
        [
            new FertilizerIngredient(chemicalComplexMock.N, 33, '009d3587-2fbb-4bde-a4a5-abc5054130a8'),
        ],
        '9f141020-190f-47a5-a320-22a9404cc439'
    ),
    new Fertilizer(
        'Удобрение 2',
        [
            new FertilizerIngredient(chemicalComplexMock.P, 10, 'c81915c0-e114-4c85-bcc5-b671b5027c7d'),
            new FertilizerIngredient(chemicalComplexMock.K, 3.2, 'd245d35c-4c20-49eb-a3c9-e16a34298a90')
        ],
        '806d985b-3319-4a27-b0d3-89aafb48d09e'
    ),
    new Fertilizer(
        'Удобрение 2.2',
        [
            new FertilizerIngredient(chemicalComplexMock.Mg, 11, '53777362-e20f-4e59-9bbe-d32939827c1a'),
            new FertilizerIngredient(chemicalComplexMock.MgSO4, 3.2, '261f7838-8408-4220-b468-b7664ff2ddf9'),
            new FertilizerIngredient(chemicalComplexMock.MgSO47H2O, 4.6, '99b3cc6a-4830-496b-b516-23d8503c1d0d'),
        ],
        '55cff78d-5918-4e8c-ad39-a64979a2a394'
    ),
    new Fertilizer(
        'Удобрение 3',
        [
            new FertilizerIngredient(chemicalComplexMock.Mg, 1.2, '2b346d3a-9144-44b5-876d-f57d71835b83'),
            new FertilizerIngredient(chemicalComplexMock.Ca, 0.5, '1991ccdd-a335-4bc8-9b71-1c3c286ea132'),
            new FertilizerIngredient(chemicalComplexMock.N, 0.3, '62475a3f-3f26-41e1-ace3-741c36c089f8'),
        ],
        'aeb89623-3085-4e82-8927-a8c48ef93f31'
    ),
    new Fertilizer(
        'Удобрение 4',
        [
            new FertilizerIngredient(chemicalComplexMock.Fe, 10, '1fb853e0-3914-47db-ad5b-a7037e79ef84'),
        ],
        'bc407186-75f3-47d7-b0fc-da50ede7329a'
    ),
    new Fertilizer(
        'Удобрение 5',
        [
            new FertilizerIngredient(chemicalComplexMock.MgSO47H2O, 23.55, '3b2fe6ad-d548-4493-99ad-07f735b40264'),
            new FertilizerIngredient(chemicalComplexMock.Fe, 1, '1fb853e0-3914-47db-ad5b-a7037e79ef84'),
        ],
        'a39f8034-e715-4004-929e-4f5b84d3b783'
    ),
    new Fertilizer(
        'Удобрение 6 Магнийсо4',
        [
            new FertilizerIngredient(chemicalComplexMock.MgSO4, 11.22, 'ede68881-6581-45fd-9ef9-bcbb32ac3784')
        ],
        '5de1961a-da62-4754-bef8-900c88d9668f'
    )
]