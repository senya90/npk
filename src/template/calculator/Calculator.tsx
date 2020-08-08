import React, {useState} from 'react';
import {FertilizerEditor} from "../../organism/fertilizerEditor/FertilizerEditor";
import {Fertilizers} from "../../organism/fertilizers/Fertilizers";
import { Fertilizer } from 'models/fertilizer';

const Calculator = () => {
    const [fertilizers, setFertilizers] = useState<Fertilizer[]>([])

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

    return (
        <div>
            <Fertilizers
                fertilizers={fertilizers}
            />
            <FertilizerEditor
                onSaveFertilizer={onSaveFertilizer}
            />
        </div>
    );
};

export {Calculator}