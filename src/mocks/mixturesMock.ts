import {Mixture} from "../models/mixture";

export const mixturesMock: Mixture[] = [
    new Mixture(
        "Для огурцов",
        [
            {
                fertilizer: {
                    id: '806d985b-3319-4a27-b0d3-89aafb48d09e',
                    name: 'Удобрение 2',
                    ingredients: [
                        {
                            id: 'c81915c0-e114-4c85-bcc5-b671b5027c7d',
                            chemicalComplexId: '2P',
                            valuePercent: 10
                        },
                        {
                            id: 'd245d35c-4c20-49eb-a3c9-e16a34298a90',
                            chemicalComplexId: '3K',
                            valuePercent: 3.2
                        }
                    ]
                },
                valueGram: 11
            },
            {
                fertilizer: {
                    id: '9f141020-190f-47a5-a320-22a9404cc439',
                    name: 'Удобрение 1',
                    ingredients: [
                        {
                            id: '009d3587-2fbb-4bde-a4a5-abc5054130a8',
                            chemicalComplexId: '1N',
                            valuePercent: 33
                        }
                    ]
                },
                valueGram: 22
            },
            {
                fertilizer: {
                    id: 'aeb89623-3085-4e82-8927-a8c48ef93f31',
                    name: 'Удобрение 3',
                    ingredients: [
                        {
                            id: '2b346d3a-9144-44b5-876d-f57d71835b83',
                            chemicalComplexId: '5M',
                            valuePercent: 1.2
                        },
                        {
                            id: '1991ccdd-a335-4bc8-9b71-1c3c286ea132',
                            chemicalComplexId: '4C',
                            valuePercent: 0.5
                        },
                        {
                            id: '62475a3f-3f26-41e1-ace3-741c36c089f8',
                            chemicalComplexId: '1N',
                            valuePercent: 0.3
                        }
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
                        {
                            id: 'c81915c0-e114-4c85-bcc5-b671b5027c7d',
                            chemicalComplexId: '2P',
                            valuePercent: 10
                        },
                        {
                            id: 'd245d35c-4c20-49eb-a3c9-e16a34298a90',
                            chemicalComplexId: '3K',
                            valuePercent: 3.2
                        }
                    ]
                },
                valueGram: 11
            },
            {
                fertilizer: {
                    id: '9f141020-190f-47a5-a320-22a9404cc439',
                    name: 'Удобрение 1',
                    ingredients: [
                        {
                            id: '009d3587-2fbb-4bde-a4a5-abc5054130a8',
                            chemicalComplexId: '1N',
                            valuePercent: 33
                        }
                    ]
                },
                valueGram: 2.2
            },
            {
                fertilizer: {
                    id: 'aeb89623-3085-4e82-8927-a8c48ef93f31',
                    name: 'Удобрение 3',
                    ingredients: [
                        {
                            id: '2b346d3a-9144-44b5-876d-f57d71835b83',
                            chemicalComplexId: '5M',
                            valuePercent: 1.2
                        },
                        {
                            id: '1991ccdd-a335-4bc8-9b71-1c3c286ea132',
                            chemicalComplexId: '4C',
                            valuePercent: 0.5
                        },
                        {
                            id: '62475a3f-3f26-41e1-ace3-741c36c089f8',
                            chemicalComplexId: '1N',
                            valuePercent: 0.3
                        }
                    ]
                },
                valueGram: 31.23
            },
        ],
        "15a0788b-2e76-4ad6-99ef-206e11e75122"
    )
]