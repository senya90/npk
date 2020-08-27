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
            new Dosage(fertilizersMock[4], 0.02),
        ],
        '8fe969b4-dfd7-4582-a715-3c2e31d0aac7'
    )
]

/**
 * тестовый расчет
 * 
 * * ----------------------------------------------------
 * 
 * 1)   MgSO4 - 11.22%    
 *                          2.75g
 * 
 *      молярка MgSO4 = 24.305 + 32.064 + 15.9994 * 4 = 120.3666
 * 
 * ----------------------------------------------------
 * 
 * 2)   Mg - 11%
 *      MgSO4 - 3.2%
 *      MgSO4 * 7H2O - 4,6%
 *                          5g
 * 
 *      молярка Mg = 24.305
 *          Mg доля от процента = 0.11
 *              Mg масса = 0.11 * 5  1000 = 550 mg
 * 
 *      молярка MgSO4 = 24.305 + 32.064 + 15.9994 * 4 = 120.3666
 *          Mg доля = 24.305 / 120.3666 = 0.20192478
 *          S доля = 32.064 / 120.3666 = 0.2663861
 *          O4 доля = 15.9994 * 4 / 120.3666 = 0.53168902
 *              Mg доля от процента = 0.032 * 0.20192478 = 0.00646159296
 *              S доля от процента = 0.032 * 0.2663861 = 0.0085243552
 *              O доля от процента = 0.032 * 0.53168902 = 0.01701405
 *                  Mg масса = 1000 * 5 * 0.00646159296 = 32.3079648 mg
 *                  S масса = 1000 * 5 * 0.0085243552 = 42.621776 mg
 *                  O масса = 1000 * 5 * 0.01701405 = 85.07025 mg
 * 
 * 
 *      молярка MgSO4 * 7H2O = 24.305 + 32.064 + 15.9994 * 4 + 7 * (2 * 1.00797  + 15.9994)
 *                          = 120.3666 + 7 * 18.01534 = 120.3666 + 126.10738 = 246.47398
 * 
 * 
 * 
 * * ----------------------------------------------------
 * 
 * 3)   P - 10%
 *      K - 3.2%
 *                          6.3g
 * 
 *      P доля от процента = 0.1
 *      K доля от процента = 0.032
 * 
 *      P масса = 0.1 * 6.3 * 1000 = 630 mg
 *      K масса = 0.032 * 6.3 * 1000 = 201.6 mg
 * 
 * * ----------------------------------------------------
 * 
 * 4)   Mg - 1.2%
 *      Ca - 0.5%
 *      N - 0.3%
 *                          0.2g
 * 
 * * ----------------------------------------------------
 * 
 * 5)   Fe - 10%
 *                          0.02g
 * 
 * * ----------------------------------------------------
 * 
 * 
 * 
 * 
 */