import {Fertilizer} from "../models/fertilizer";

export const fertilizersMock: Fertilizer[] = [
    {
        id: '9f141020-190f-47a5-a320-22a9404cc439',
        name: 'Удобрение 1',
        composition: [
            {
                id: '009d3587-2fbb-4bde-a4a5-abc5054130a8',
                chemicalId: '1N',
                value: 33
            }
        ]
    },
    {
        id: '806d985b-3319-4a27-b0d3-89aafb48d09e',
        name: 'Удобрение 2',
        composition: [
            {
                id: 'c81915c0-e114-4c85-bcc5-b671b5027c7d',
                chemicalId: '2P',
                value: 10
            },
            {
                id: 'd245d35c-4c20-49eb-a3c9-e16a34298a90',
                chemicalId: '3K',
                value: 3.2
            }
        ]
    },

]