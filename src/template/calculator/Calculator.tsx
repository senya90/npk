import React, {useCallback, useEffect, useState} from 'react';
import {Fertilizers} from "organism/fertilizers/Fertilizers";
import {Fertilizer, FertilizerDTO} from 'models/fertilizer';
import {MixtureComposition} from "organism/mixtureComposition/MixtureComposition";

import style from './calculator.module.scss'
import {CalculatorContext} from 'helpers/contexts/CalculatorContext';
import {Mixture} from "models/mixture/mixture";
import { Mixtures } from 'organism/mixtures/Mixtures';
import {AgriculturesView} from "organism/agriclulturesView/AgriculturesView";
import {ChemicalComparison} from "organism/checmicalComparison/ChemicalComparison";
import {Agriculture} from "models/agriculture";
import {ChemicalComplex, ChemicalComplexDTO} from "models/chemicalComplex/chemicalComplex";
import {ChemicalUnit} from "models/chemicalUnit";
import {isExist} from "helpers/utils";
import {API} from "core/api";
import {ApiURL} from "core/api/ApiURL";
import { ServerResponse } from 'models/response';


const Calculator = () => {
    const [chemicals, setChemicals] = useState<ChemicalUnit[]>([])
    const [chemicalComplexes, setChemicalComplexes] = useState<ChemicalComplex[]>([])
    const [fertilizers, setFertilizers] = useState<Fertilizer[]>([])
    const [editableFertilizer, setEditableFertilizer] = useState<Fertilizer>()
    const [allMixtures, setAllMixtures] = useState<Mixture[]>([])
    const [mixture, setMixture] = useState<Mixture>()
    const [activeAgriculture, setActiveAgriculture] = useState<Agriculture>(new Agriculture())
    const [agricultures, setAgricultures] = useState<Agriculture[]>([])


    const updateFertilizersByServer = useCallback(() => {
        getFertilizersApi().then(res => setFertilizers(res))
    }, [])

    useEffect(() => {
        getChemicalsApi()
            .then(result => setChemicals(result))

        updateFertilizersByServer()

        getComplexesApi()
            .then(complexes => setChemicalComplexes(complexes))
    }, [updateFertilizersByServer])

    const getChemicalsApi = async (): Promise<ChemicalUnit[]> => {
        try {
            const result = await API.get(ApiURL.getChemicals)
            const chemicals = result.data.data

            if (!isExist(chemicals)) {
                return []
            }

            return chemicals.map((chemical: any) => (new ChemicalUnit(chemical.name, chemical.molar, chemical.id)))
        } catch (e) {
            return []
        }
    }

    const getFertilizersApi = async (): Promise<Fertilizer[]> => {
        const result = await API.getAuthorized<FertilizerDTO[]>(ApiURL.getFertilizers)
        if (result.data.error) {
            return []
        }

        const fertilizersDTO: FertilizerDTO[] = result.data.data
        return fertilizersDTO.map(dto => Fertilizer.createFromDTO(dto))
    }

    const getComplexesApi = async (): Promise<ChemicalComplex[]> => {
        const response = await API.getAuthorized<ChemicalComplexDTO[]>(ApiURL.getChemicalComplexes)

        if (response.data.data) {
            let complexes: ChemicalComplex[] = response.data.data.map(chemicalDTO => ChemicalComplex.createFromDto(chemicalDTO))
            return complexes.map(complex => {
                return new ChemicalComplex(complex.name, [...complex.chemicalAggregates], complex.id, complex.userId)
            })
        }

        return []
    }

    const onSaveFertilizer = async (savedFertilizer: Fertilizer): Promise<any> => {
        const found = fertilizers.find(fertilizer => fertilizer.id === savedFertilizer.id)

        if (!found) {
            await _addFertilizerApi(savedFertilizer)
            setEditableFertilizer(undefined)
            return savedFertilizer
        }

        await _updateFertilizerApi(savedFertilizer)
        setEditableFertilizer(undefined)
        return savedFertilizer
    }

    const _addFertilizerApi = async (newFertilizer: Fertilizer): Promise<any> => {
        const response = await API.postAuthorized(ApiURL.addFertilizer, newFertilizer)
        if (!response.data.error) {
            updateFertilizersByServer()
        }
        return response.data.data
    }

    const _updateFertilizerApi = async (updatedFertilizer: Fertilizer) => {
        try {
            await API.postAuthorized(ApiURL.updateFertilizer, {fertilizer: [updatedFertilizer]})
            updateFertilizersByServer()
        } catch (err) {

        }
    }

    const onDeleteFertilizer = async (fertilizerId: string) => {
        try {
            await API.postAuthorized(ApiURL.deleteFertilizer, {id: [fertilizerId]})
            updateFertilizersByServer()
        } catch (err) {

        }
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
        return chemicalComplexes.find(chemicalComplex => chemicalComplex.id === chemicalComplexId)
    }

    const onChemicalComplexSaved = async () => {
        const complexes = await getComplexesApi()
        setChemicalComplexes(complexes)
    }

    const onChemicalComplexRemoved = async () => {
        const complexes = await getComplexesApi()
        setChemicalComplexes(complexes)
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
                chemicals: chemicals,
                onDeleteFertilizer: onDeleteFertilizer,
                onSaveFertilizer: onSaveFertilizer,
                onEditFertilizer: onFertilizerEdit,

                getFertilizerById: getFertilizerById,
                chemicalComplexes: chemicalComplexes,
                getChemicalComplexById: getChemicalComplexById,
                onChemicalComplexSaved: onChemicalComplexSaved,
                onChemicalComplexRemoved: onChemicalComplexRemoved,

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
                        chemicalComplexes={chemicalComplexes}
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