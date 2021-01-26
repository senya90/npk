import React, {useEffect, useState} from 'react';
import {Fertilizers} from "../../organism/fertilizers/Fertilizers";
import { Fertilizer } from 'models/fertilizer';
import {MixtureComposition} from "../../organism/mixtureComposition/MixtureComposition";

import style from './calculator.module.scss'
import {CalculatorContext} from 'helpers/contexts/CalculatorContext';
import {Mixture} from "../../models/mixture/mixture";
import { Mixtures } from 'organism/mixtures/Mixtures';
import {mixturesMock} from "../../mocks/mixturesMock";
import {AgriculturesView} from "../../organism/agriclulturesView/AgriculturesView";
import {agriculturesMock} from "../../mocks/agriculturesMock";
import {ChemicalComparison} from "../../organism/checmicalComparison/ChemicalComparison";
import {Agriculture} from "../../models/agriculture";
import {ChemicalComplex} from "../../models/chemicalComplex/chemicalComplex";
import {chemicalComplexMockArray} from "../../mocks/chemicalComplexMock";
import {ChemicalUnit} from "../../models/chemicalUnit";
import {isExist} from "../../helpers/utils";
import {API} from "core/api";
import {ApiURL} from "core/api/ApiURL";


const Calculator = () => {
    const [chemicals, setChemicals] = useState<ChemicalUnit[]>([])
    const [fertilizers, setFertilizers] = useState<Fertilizer[]>([])
    const [editableFertilizer, setEditableFertilizer] = useState<Fertilizer>()
    const [allMixtures, setAllMixtures] = useState<Mixture[]>(mixturesMock)
    const [mixture, setMixture] = useState<Mixture>()
    const [activeAgriculture, setActiveAgriculture] = useState<Agriculture>(agriculturesMock[0])
    const [agricultures, setAgricultures] = useState<Agriculture[]>([])


    useEffect(() => {
        getChemicalsApi()
            .then(result => setChemicals(result))

        getFertilizersApi()
            .then(result => setFertilizers(result))
    }, [])

    const getChemicalsApi = async (): Promise<ChemicalUnit[]> => {
        try {
            const result = await API.get(ApiURL.getChemicals)
            const chemicals = result.data

            if (!isExist(chemicals)) {
                return []
            }

            return chemicals.map((chemical: any) => (new ChemicalUnit(chemical.name, chemical.molar, chemical.id)))
        } catch (e) {
            return []
        }
    }

    const getFertilizersApi = (): Promise<Fertilizer[]> => {
        return new Promise<Fertilizer[]>(resolve => {
            resolve([])
        })
    }



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

    const onSelectAgriculture = (agriculture: Agriculture) => {
        setActiveAgriculture(agriculture)
    }

    const onAgriculturesUpdated = (updatedAgricultures: Agriculture[]) => {
        const withUpdated = agricultures.map(agriculture => {
            let agricultureForUpdatedList = agriculture

            for (let i = 0; i < updatedAgricultures.length; i++) {
                if (updatedAgricultures[i].id === agriculture.id) {
                    agricultureForUpdatedList = updatedAgricultures[i]
                    break
                }
            }
            return agricultureForUpdatedList
        })

        setAgricultures(withUpdated)
        
        const newUpdatedAgriculture = updatedAgricultures.find(agriculture => agriculture.id === activeAgriculture.id)
        if (newUpdatedAgriculture) {
            setActiveAgriculture(newUpdatedAgriculture)
        }
    }

    const onAgriculturesAdd = (addedAgricultures: Agriculture[]) => {
        setAgricultures([...agricultures, ...addedAgricultures])
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

                onAgricultureSelect: onSelectAgriculture,
                onAgriculturesUpdated: onAgriculturesUpdated
            }}
            >
                <div className={style.box}>
                    <Fertilizers
                        fertilizers={fertilizers}
                        editableFertilizer={editableFertilizer}
                        mixture={mixture}
                    />
                    <MixtureComposition
                        mixture={mixture}
                    />
                    <ChemicalComparison
                        chemicals={chemicals}
                        activeAgriculture={activeAgriculture}
                        mixture={mixture}
                    />
                    <AgriculturesView
                        chemicals={chemicals}
                        agricultures={agricultures}
                        activeAgriculture={activeAgriculture}
                        onAgriculturesUpdated={onAgriculturesUpdated}
                        onAgriculturesAdd={onAgriculturesAdd}
                    />
                </div>
                <div>
                    <Mixtures
                        mixtures={allMixtures}
                    />
                </div>
                <br/>
                <br/>
            </CalculatorContext.Provider>

        </div>
    );
};

export {Calculator}