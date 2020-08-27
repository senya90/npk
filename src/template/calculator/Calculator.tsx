import React, {useState} from 'react';
import {FertilizerEditor} from "../../organism/fertilizerEditor/FertilizerEditor";
import {Fertilizers} from "../../organism/fertilizers/Fertilizers";
import { Fertilizer } from 'models/fertilizer';
import {fertilizersMock} from "../../mocks/fertilizersMock";
import {MixtureComposition} from "../../organism/mixtureComposition/MixtureComposition";

import style from './calculator.module.scss'
import {CalculatorContext} from 'helpers/contexts/CalculatorContext';
import {Mixture} from "../../models/mixture/mixture";
import { Mixtures } from 'organism/mixtures/Mixtures';
import {mixturesMock} from "../../mocks/mixturesMock";
import {Crops} from "../../organism/crops/Crops";
import {cropsMock} from "../../mocks/cropsMock";
import {ChemicalComparison} from "../../organism/checmicalComparison/ChemicalComparison";
import {Crop} from "../../models/crop";
import {ChemicalComplex} from "../../models/chemicalComplex";
import {chemicalComplexMockArray} from "../../mocks/chemicalComplexMock";


const Calculator = () => {
    const [fertilizers, setFertilizers] = useState<Fertilizer[]>(fertilizersMock)
    const [editableFertilizer, setEditableFertilizer] = useState<Fertilizer>()
    const [allMixtures, setAllMixtures] = useState<Mixture[]>(mixturesMock)
    const [mixture, setMixture] = useState<Mixture>()
    const [activeCrop, setActiveCrop] = useState<Crop>(cropsMock[0])


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

    const getChemicalComplexById = (chemicalComplexId: string): ChemicalComplex | undefined => {
        return chemicalComplexMockArray().find(chemicalComplex => chemicalComplex.id === chemicalComplexId)
    }

    const onAddFertilizerToMixture = (fertilizerId: string) => {
        const addedFertilizer = getFertilizerById(fertilizerId)

        if (mixture && !mixture.isAvailableForFertilizer(addedFertilizer)) {
            return
        }

        const newMixture = Mixture.getActualMixture(mixture)
        if (addedFertilizer) {
            newMixture.addFertilizer(addedFertilizer)
        }
        onMixtureUpdated(newMixture)
    }

    const onMixtureUpdated = (mixture: Mixture) => {
        setMixture(mixture)
    }

    const onMixtureSave = () => {
        if (mixture) {
            setAllMixtures([...allMixtures, mixture])
            clearEditingMixture()
        }
    }

    const clearEditingMixture = () => {
        setMixture(undefined)
    }

    const onCropSelect = (crop: Crop) => {
        setActiveCrop(crop)
    }

    return (
        <div>
            <CalculatorContext.Provider value={{
                onDeleteFertilizer: onFertilizerDelete,
                onSaveFertilizer: onSaveFertilizer,
                onEditFertilizer: onFertilizerEdit,

                getFertilizerById: getFertilizerById,
                getChemicalComplexById: getChemicalComplexById,

                onMixtureUpdated: onMixtureUpdated,
                onAddFertilizerToMixture: onAddFertilizerToMixture,
                onMixtureSave: onMixtureSave,

                onCropSelect: onCropSelect
            }}
            >
                <div className={style.box}>
                    <Fertilizers
                        fertilizers={fertilizers}
                    />
                    <MixtureComposition
                        mixture={mixture}
                    />
                    <ChemicalComparison
                        activeCrop={activeCrop}
                        mixture={mixture}
                    />
                    <Crops
                        crops={cropsMock}
                        activeCrop={activeCrop}
                    />
                </div>
                <div>
                    <Mixtures
                        mixtures={allMixtures}
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