import React, {useState} from 'react';
import {FertilizerEditor} from "../../organism/fertilizerEditor/FertilizerEditor";
import {Fertilizers} from "../../organism/fertilizers/Fertilizers";
import { Fertilizer } from 'models/fertilizer';
import {fertilizersMock} from "../../mocks/fertilizersMock";
import {MixtureComposition} from "../../organism/mixtureComposition/MixtureComposition";

import style from './calculator.module.scss'
import {CalculatorContext} from 'helpers/contexts/CalculatorContext';
import {Mixture} from "../../models/mixture";
import { isMixtureAvailableForFertilizer } from './calculator.methods';


const Calculator = () => {
    const [fertilizers, setFertilizers] = useState<Fertilizer[]>(fertilizersMock)
    const [editableFertilizer, setEditableFertilizer] = useState<Fertilizer>()
    const [mixture, setMixture] = useState<Mixture>()


    const onSaveFertilizer = (savedFertilizer: Fertilizer): Fertilizer => {
        const found = fertilizers.find(fertilizer => fertilizer.id === savedFertilizer.id)
        setEditableFertilizer(undefined)

        if (!found) {
            addFertilizer(savedFertilizer)
            return savedFertilizer
        }

        updateFertilizer(savedFertilizer)
        return savedFertilizer
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

    const onFertilizerDelete = (fertilizerId: string): boolean => {
        const updatedFertilizers = fertilizers.filter(fertilizer => fertilizer.id !== fertilizerId)
        setFertilizers(updatedFertilizers)
        return true
    }

    const onFertilizerEdit = (fertilizerId: string): Fertilizer => {
        const found = getFertilizerById(fertilizerId)
        if (found) {
            setEditableFertilizer(found)
            return found
        }
        return new Fertilizer()
    }

    const getFertilizerById = (fertilizerId: string): Fertilizer | undefined => {
        return fertilizers.find(fertilizer => fertilizer.id === fertilizerId)
    }

    const getActualMixture = (): Mixture => {
        let actualMixture = new Mixture()
        if (mixture) {
            const {name, dosages, id} = mixture
            actualMixture = new Mixture(name, dosages, id)
        }
        return actualMixture
    }

    const onAddFertilizerToMixture = (fertilizerId: string) => {
        if (!isMixtureAvailableForFertilizer(mixture, fertilizerId)) {
            return
        }

        const newMixture = getActualMixture()
        const addedFertilizer = getFertilizerById(fertilizerId)
        if (addedFertilizer) {
            newMixture.addFertilizer(addedFertilizer)
        }
        setMixture(newMixture)
    }

    return (
        <div>
            <CalculatorContext.Provider value={{
                onDeleteFertilizer: onFertilizerDelete,
                onSaveFertilizer: onSaveFertilizer,
                onEditFertilizer: onFertilizerEdit,
                onAddFertilizerToMixture: onAddFertilizerToMixture,
                getFertilizerById: getFertilizerById
            }}
            >
                <div className={style.box}>

                    <Fertilizers
                        fertilizers={fertilizers}
                    />
                    <MixtureComposition
                        mixture={mixture}
                    />
                </div>
                <br/>
                <br/>
                <FertilizerEditor
                    editableFertilizer={editableFertilizer}
                />
            </CalculatorContext.Provider>

        </div>
    );
};

export {Calculator}