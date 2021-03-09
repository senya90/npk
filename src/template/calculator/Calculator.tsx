import React, {useCallback, useEffect, useState} from 'react';
import {Fertilizers} from "organism/fertilizers/Fertilizers";
import {Fertilizer} from 'models/fertilizer/fertilizer';
import {SolutionComposition} from "organism/solutionComposition/SolutionComposition";

import style from './calculator.module.scss'
import {CalculatorContext} from 'helpers/contexts/CalculatorContext';
import {Solution} from "models/solution/solution";
import { Solutions } from 'organism/solutions/Solutions';
import {AgriculturesView} from "organism/agriclulturesView/AgriculturesView";
import {ChemicalComparison} from "organism/checmicalComparison/ChemicalComparison";
import {Agriculture} from "models/agriculture";
import {ChemicalComplex} from "models/chemicalComplex/chemicalComplex";
import {ChemicalUnit} from "models/chemicalUnit";
import {isExist} from "helpers/utils";
import {API} from "core/api";
import {ApiURL} from "core/api/ApiURL";
import { FertilizerDTO } from 'models/_types/fertilizer';
import { ChemicalComplexDTO } from 'models/_types/chemicalComplex';


const Calculator = () => {
    const [chemicals, setChemicals] = useState<ChemicalUnit[]>([])
    const [chemicalComplexes, setChemicalComplexes] = useState<ChemicalComplex[]>([])
    const [fertilizers, setFertilizers] = useState<Fertilizer[]>([])
    const [editableFertilizer, setEditableFertilizer] = useState<Fertilizer>()
    const [allSolutions, setAllSolutions] = useState<Solution[]>([])
    const [solution, setSolution] = useState<Solution>()
    const [activeAgriculture, setActiveAgriculture] = useState<Agriculture>(new Agriculture())
    const [agricultures, setAgricultures] = useState<Agriculture[]>([])


    const updateFertilizersByServer = useCallback(() => {
        getFertilizersApi().then(res => setFertilizers(res))
    }, [])

    const _updateSolutionsByAPI = useCallback(async () => {
        const solutions = await getSolutionsAPI()
        setAllSolutions(solutions)
    }, [])

    useEffect(() => {
        getChemicalsApi()
            .then(result => setChemicals(result))

        updateFertilizersByServer()

        getComplexesApi()
            .then(complexes => setChemicalComplexes(complexes))

        _updateSolutionsByAPI().then()

    }, [updateFertilizersByServer, _updateSolutionsByAPI])

    const getSolutionsAPI = async (): Promise<Solution[]> => {
        try {
            const result = await API.getAuthorized<Solution[]>(ApiURL.getSolutions)
            return result.data.data
        } catch (err) {
            console.error(err)
            return []
        }
    }

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

    const onEditFertilizer = (fertilizerId: string | undefined) => {
        if (!fertilizerId) {
            return setEditableFertilizer(new Fertilizer())
        }

        const found = getFertilizerById(fertilizerId)
        if (found) {
            return setEditableFertilizer(found)
        }

        return setEditableFertilizer(new Fertilizer())
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

    const onAddFertilizerToSolution = (fertilizerId: string) => {
        const addedFertilizer = getFertilizerById(fertilizerId)

        if (solution && !solution.isAvailableForFertilizer(addedFertilizer)) {
            return
        }

        const newSolution = Solution.getActualSolution(solution)
        if (addedFertilizer) {
            newSolution.addFertilizer(addedFertilizer)
        }
        onSolutionUpdated(newSolution)
    }

    const onSolutionUpdated = (solution: Solution) => {
        setSolution(solution)
    }

    const onSolutionSave = async () => {
        if (solution) {
            const response = await API.postAuthorized(ApiURL.addSolution, {solution: [solution]})
            if (!response.data.error) {
                clearEditingSolution()
                await _updateSolutionsByAPI()
            }
        }
    }

    const onDeleteSolution = async (solution: Solution) => {
        const response = await API.postAuthorized(ApiURL.deleteSolution, {id: [solution.id]})

        if (!response.data.error) {
            await _updateSolutionsByAPI()
        }
    }

    const clearEditingSolution = () => {
        setSolution(undefined)
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
                onEditFertilizer: onEditFertilizer,

                getFertilizerById: getFertilizerById,
                chemicalComplexes: chemicalComplexes,
                getChemicalComplexById: getChemicalComplexById,
                onChemicalComplexSaved: onChemicalComplexSaved,
                onChemicalComplexRemoved: onChemicalComplexRemoved,

                onSolutionUpdated: onSolutionUpdated,
                onAddFertilizerToSolution: onAddFertilizerToSolution,
                onSolutionSave: onSolutionSave,
                onDeleteSolution,

                onAgricultureSelect: onSelectAgriculture,
                onAgriculturesUpdated: onAgriculturesUpdated
            }}
            >
                <div className={style.box}>
                    <Fertilizers
                        fertilizers={fertilizers}
                        editableFertilizer={editableFertilizer}
                        solution={solution}
                        chemicalComplexes={chemicalComplexes}
                    />
                    <SolutionComposition
                        solution={solution}
                    />
                    <ChemicalComparison
                        chemicals={chemicals}
                        activeAgriculture={activeAgriculture}
                        solution={solution}
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
                    <Solutions
                        solutions={allSolutions}
                    />
                </div>
                <br/>
                <br/>
            </CalculatorContext.Provider>

        </div>
    );
};

export {Calculator}