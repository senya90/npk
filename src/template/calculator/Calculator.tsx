import React, {useCallback, useEffect, useState} from 'react';
import {Fertilizers} from "organism/fertilizers/Fertilizers";
import {Fertilizer} from 'models/fertilizer/fertilizer';
import {SolutionComposition} from "organism/solutionComposition/SolutionComposition";

import style from './calculator.module.scss'
import {CalculatorContext} from 'helpers/contexts/CalculatorContext';
import {Solution, SolutionDTO} from "models/solution/solution";
import { Solutions } from 'organism/solutions/Solutions';
import {AgriculturesView} from "organism/agriclulturesView/AgriculturesView";
import {ChemicalComparison} from "organism/checmicalComparison/ChemicalComparison";
import {Agriculture, AgricultureDTO} from "models/agriculture";
import {ChemicalComplex} from "models/chemicalComplex/chemicalComplex";
import {ChemicalUnit} from "models/chemicalUnit";
import {isExist, notEmptyArray} from "helpers/utils";
import {API} from "core/api";
import {ApiURL} from "core/api/ApiURL";
import { FertilizerDTO } from 'models/_types/fertilizer';
import { ChemicalComplexDTO } from 'models/_types/chemicalComplex';
import {Dosage} from "../../models/dosage";
import {ServerResponse} from "../../models/_types/serverResponse";


const Calculator = () => {
    const [chemicals, setChemicals] = useState<ChemicalUnit[]>([])
    const [chemicalComplexes, setChemicalComplexes] = useState<ChemicalComplex[]>([])
    const [fertilizers, setFertilizers] = useState<Fertilizer[]>([])
    const [editableFertilizer, setEditableFertilizer] = useState<Fertilizer>()
    const [allSolutions, setAllSolutions] = useState<Solution[]>([])
    const [solution, setSolution] = useState<Solution>()
    const [editSolutionMode, setEditSolutionMode] = useState<boolean>(false)
    const [activeAgriculture, setActiveAgriculture] = useState<Agriculture>(new Agriculture())
    const [agricultures, setAgricultures] = useState<Agriculture[]>([])


    const updateFertilizersByServer = useCallback(() => {
        getFertilizersApi().then(res => setFertilizers(res))
    }, [])

    const _updateSolutionsByAPI = useCallback(async () => {
        const solutions = await getSolutionsAPI()
        setAllSolutions(solutions)
    }, [])

    const updateAgriculturesByAPI = useCallback(async () => {
        const agricultures = await getAgriculturesAPI()
        setAgricultures(agricultures)
    }, [])

    useEffect(() => {
        getChemicalsApi()
            .then(result => setChemicals(result))

        updateFertilizersByServer()
        updateAgriculturesByAPI().then()

        getComplexesApi()
            .then(complexes => setChemicalComplexes(complexes))

        _updateSolutionsByAPI().then()

    }, [updateFertilizersByServer, _updateSolutionsByAPI, updateAgriculturesByAPI])

    const getAgriculturesAPI = async (): Promise<Agriculture[]> => {
        try {
            const response = await API.getAuthorized<AgricultureDTO[]>(ApiURL.getAgricultures)
            const agricultures: AgricultureDTO[] = response.data.data
            if (agricultures) {
                return agricultures.map(agriculture => Agriculture.createNew(agriculture))
            }

            return []
        } catch (err) {
            console.error(err)
            return []
        }
    }

    const getSolutionsAPI = async (): Promise<Solution[]> => {
        try {
            const result = await API.getAuthorized<SolutionDTO[]>(ApiURL.getSolutions)
            return result.data.data.map(solution => new Solution(solution))
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
        return fertilizersDTO.map(dto => Fertilizer.createNew(dto))
    }

    const getComplexesApi = async (): Promise<ChemicalComplex[]> => {
        const response = await API.getAuthorized<ChemicalComplexDTO[]>(ApiURL.getChemicalComplexes)

        if (response.data.data) {
            let complexes: ChemicalComplex[] = response.data.data.map(chemicalDTO => ChemicalComplex.createNew(chemicalDTO))
            return complexes.map(complex => {
                return new ChemicalComplex(complex.name, [...complex.chemicalAggregates], complex.id, complex.userId)
            })
        }

        return []
    }

    const onSaveFertilizer = async (savedFertilizer: Fertilizer): Promise<any> => {
        const found = fertilizers.find(fertilizer => fertilizer.id === savedFertilizer.id)

        try {
            if (!found) {
                _onAddFertilizer(savedFertilizer).then()
                return
            }

            _onUpdatedFertilizer(savedFertilizer).then()
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    const _onAddFertilizer = async (savedFertilizer: Fertilizer) => {
        const response = await _addFertilizerApi(savedFertilizer)
        if (!response.data.error) {
            updateFertilizersByServer()
        }
        setEditableFertilizer(undefined)
    }

    const _onUpdatedFertilizer = async (savedFertilizer: Fertilizer) => {
        const response = await _updateFertilizerApi(savedFertilizer)
        if (!response.data.error) {
            updateFertilizersByServer()
        }
        const updatedFertilizers: FertilizerDTO[] = response.data.data
        setEditableFertilizer(undefined)

        if (solution && notEmptyArray(updatedFertilizers)) {
            const updatedSolution: Solution = solution.updateFertilizers(updatedFertilizers)
            setSolution(updatedSolution)
        }
    }

    const _addFertilizerApi = async (newFertilizer: Fertilizer): Promise<ServerResponse<FertilizerDTO[]>> => {
        return await API.postAuthorized<FertilizerDTO[]>(ApiURL.addFertilizer, newFertilizer)
    }

    const _updateFertilizerApi = async (updatedFertilizer: Fertilizer): Promise<ServerResponse<FertilizerDTO[]>> => {
        return await API.postAuthorized<FertilizerDTO[]>(ApiURL.updateFertilizer, {fertilizer: [updatedFertilizer]})
    }

    const onDeleteFertilizer = async (fertilizerId: string, needUpdateSolutions = false) => {
        updateFertilizersByServer()

        if (solution) {
            const updatedSolution: Solution = solution.removeFertilizer(fertilizerId)
            setSolution(updatedSolution)
        }

        if (needUpdateSolutions) {
            _updateSolutionsByAPI().then()
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

        _updateEditedSolutionIfNeed(complexes)
    }

    const _updateEditedSolutionIfNeed = (updatedComplexes: ChemicalComplex[]) => {
        if (solution) {
            const dosagesWithoutDeletedComplex: Dosage[] = solution.dosages.map(dosage => {
                return dosage.subtractPreviouslyUsedIngredients(updatedComplexes)
            })

            const solutionDTO: SolutionDTO = {
                id: solution.id,
                name: solution.name,
                dosages: dosagesWithoutDeletedComplex,
                timestamp: solution.timestamp,
                orderNumber: solution.orderNumber
            }
            const updatedSolution = new Solution(solutionDTO)
            setSolution(updatedSolution)
        }
    }

    const onAddFertilizerToSolution = (fertilizerId: string) => {
        const addedFertilizer = getFertilizerById(fertilizerId)

        if (solution && !solution.isAvailableForFertilizer(addedFertilizer)) {
            return
        }

        const newSolution = solution ? solution : Solution.getActualSolution(solution)
        if (addedFertilizer) {
            newSolution.addFertilizer(addedFertilizer)
        }
        onSolutionUpdated(newSolution)
    }

    const onSolutionUpdated = (solution: Solution) => {
        if (notEmptyArray(solution.dosages)) {
            setSolution(new Solution(solution))
            return
        }

        clearEditingSolution()
    }

    const onEditSolution = (solution: Solution) => {
        setSolution(new Solution(solution))
        setEditSolutionMode(true)
    }

    const onSolutionSave = async () => {
        if (solution) {
            let urlRequest = editSolutionMode ? ApiURL.updateSolution : ApiURL.addSolution
            const response = await API.postAuthorized(urlRequest, {solution: [solution]})

            if (!response.data.error) {
                clearEditingSolution()
                await _updateSolutionsByAPI()
            }
            return
        }

        clearEditingSolution()
    }

    const onDeleteSolution = async (solution: Solution) => {
        const response = await API.postAuthorized(ApiURL.deleteSolution, {id: [solution.id]})

        if (!response.data.error) {
            await _updateSolutionsByAPI()
        }
    }

    const clearEditingSolution = () => {
        setSolution(undefined)
        setEditSolutionMode(false)
    }

    const onSelectAgriculture = (agriculture: Agriculture) => {
        setActiveAgriculture(agriculture)
    }

    const onUpdateAgricultures = (updatedAgricultures: Agriculture[]) => {
        updateAgriculturesByAPI().then()

        if (activeAgriculture) {
            const agricultureForUpdate = updatedAgricultures.find(agriculture => agriculture.id === activeAgriculture.id)
            if (agricultureForUpdate) {
                setActiveAgriculture(agricultureForUpdate)
            }
        }
    }

    const onAgriculturesAdd = () => {
        updateAgriculturesByAPI().then()
    }

    const onDeleteAgricultures = (deletedAgriculturesIds: string[]) => {
        updateAgriculturesByAPI().then()

        if (activeAgriculture) {
            const needToClear = deletedAgriculturesIds.find(agricultureId => agricultureId === activeAgriculture.id)
            if (needToClear) {
                setActiveAgriculture(new Agriculture())
            }
        }
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
                onEditSolution,

                onAgricultureSelect: onSelectAgriculture,
                onAgriculturesAdd: onAgriculturesAdd,
                onUpdateAgricultures: onUpdateAgricultures,
                onDeleteAgricultures: onDeleteAgricultures
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
                        agricultures={agricultures}
                        activeAgriculture={activeAgriculture}
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