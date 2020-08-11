import React, {useState} from 'react';
import {FertilizerEditor} from "../../organism/fertilizerEditor/FertilizerEditor";
import {Fertilizers} from "../../organism/fertilizers/Fertilizers";
import { Fertilizer } from 'models/fertilizer';
import {fertilizersMock} from "../../mocks/fertilizersMock";
import {MixtureComposition} from "../../organism/mixtureComposition/MixtureComposition";

import style from './calculator.module.scss'


const Calculator = () => {
    const [fertilizers, setFertilizers] = useState<Fertilizer[]>(fertilizersMock)

    const onSaveFertilizer = (savedFertilizer: Fertilizer) => {
        const found = fertilizers.find(fertilizer => fertilizer.id === savedFertilizer.id)
        if (!found) {
            addFertilizer(savedFertilizer)
            return
        }

        updateFertilizer(savedFertilizer)
    }

    const addFertilizer = (savedFertilizer: Fertilizer) => {
        setFertilizers([...fertilizers, savedFertilizer])
    }

    const updateFertilizer = (updatedFertilizer: Fertilizer) => {
        const newFertilizers = fertilizers.map(fertilizer => {
            if (fertilizer.id === updatedFertilizer.id) {
                return updatedFertilizer
            }
            return fertilizer
        })
        setFertilizers(newFertilizers)
    }

    console.log(fertilizers)
    console.log(JSON.stringify(fertilizers))

    return (
        <div>
            <div className={style.box}>
                <Fertilizers
                    fertilizers={fertilizers}
                />
                <MixtureComposition />
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <FertilizerEditor
                onSaveFertilizer={onSaveFertilizer}
            />
        </div>
    );
};

export {Calculator}