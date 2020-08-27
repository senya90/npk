import { Mixture } from "../models/mixture/mixture";
import { FertilizerIngredient } from "models/fertilizerIngredient";
import { chemicalComplexMock } from "./chemicalComplexMock";
import { Dosage } from "models/dosage";
import { fertilizersMock } from "./fertilizersMock";

export const mixturesMock: Mixture[] = [
    new Mixture(
        "Для огурцов",
        [
            {
                fertilizer: {
                    id: '806d985b-3319-4a27-b0d3-89aafb48d09e',
                    name: 'Удобрение 2',
                    ingredients: [
                        new FertilizerIngredient(chemicalComplexMock.P, 10, 'c81915c0-e114-4c85-bcc5-b671b5027c7d'),
                        new FertilizerIngredient(chemicalComplexMock.K, 3.2, 'd245d35c-4c20-49eb-a3c9-e16a34298a90')
                    ]
                },
                valueGram: 11
            },
            {
                fertilizer: {
                    id: '9f141020-190f-47a5-a320-22a9404cc439',
                    name: 'Удобрение 1',
                    ingredients: [
                        new FertilizerIngredient(chemicalComplexMock.N, 33, '009d3587-2fbb-4bde-a4a5-abc5054130a8')
                    ]
                },
                valueGram: 22
            },
            {
                fertilizer: {
                    id: 'aeb89623-3085-4e82-8927-a8c48ef93f31',
                    name: 'Удобрение 3',
                    ingredients: [
                        new FertilizerIngredient(chemicalComplexMock.Mg, 1.2, '2b346d3a-9144-44b5-876d-f57d71835b83'),
                        new FertilizerIngredient(chemicalComplexMock.Ca, 0.5, '1991ccdd-a335-4bc8-9b71-1c3c286ea132'),
                        new FertilizerIngredient(chemicalComplexMock.N, 0.3, '62475a3f-3f26-41e1-ace3-741c36c089f8')
                    ]
                },
                valueGram: 22
            },
        ],
        "15a0788b-2e76-4ad6-99ef-206e11e751bf"
    ),
    new Mixture(
        "Для помидор",
        [
            {
                fertilizer: {
                    id: '806d985b-3319-4a27-b0d3-89aafb48d09e',
                    name: 'Удобрение 2',
                    ingredients: [
                        new FertilizerIngredient(chemicalComplexMock.P, 10, 'c81915c0-e114-4c85-bcc5-b671b5027c7d'),
                        new FertilizerIngredient(chemicalComplexMock.K, 3.2, 'd245d35c-4c20-49eb-a3c9-e16a34298a90'),
                    ]
                },
                valueGram: 11
            },
            {
                fertilizer: {
                    id: '9f141020-190f-47a5-a320-22a9404cc439',
                    name: 'Удобрение 1',
                    ingredients: [
                        new FertilizerIngredient(chemicalComplexMock.N, 33, '009d3587-2fbb-4bde-a4a5-abc5054130a8')
                    ]
                },
                valueGram: 2.2
            },
            {
                fertilizer: {
                    id: 'aeb89623-3085-4e82-8927-a8c48ef93f31',
                    name: 'Удобрение 3',
                    ingredients: [
                        new FertilizerIngredient(chemicalComplexMock.Mg, 1.2, '2b346d3a-9144-44b5-876d-f57d71835b83'),
                        new FertilizerIngredient(chemicalComplexMock.Ca, 0.5, '1991ccdd-a335-4bc8-9b71-1c3c286ea132'),
                        new FertilizerIngredient(chemicalComplexMock.N, 0.3, '62475a3f-3f26-41e1-ace3-741c36c089f8')
                    ]
                },
                valueGram: 31.23
            },
        ],
        "15a0788b-2e76-4ad6-99ef-206e11e75122"
    ),
    new Mixture(
        'Тестовый раствор',
        [
            new Dosage(fertilizersMock[6], 2.75),
            new Dosage(fertilizersMock[2], 5),
            new Dosage(fertilizersMock[1], 6.3),
            new Dosage(fertilizersMock[3], 0.2),
            new Dosage(fertilizersMock[4], 0.001),
        ],
        '8fe969b4-dfd7-4582-a715-3c2e31d0aac7'
    )
]