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
import {Agriculture} from "models/agriculture";
import {ChemicalComplex} from "models/chemicalComplex/chemicalComplex";
import {ChemicalUnit} from "models/chemicalUnit";
import {isExist, notEmptyArray} from "helpers/utils";
import {API} from "core/api";
import {ApiURL} from "core/api/ApiURL";
import { FertilizerDTO } from 'models/_types/fertilizer';
import { ChemicalComplexDTO } from 'models/_types/chemicalComplex';
import {Dosage, DosageDTO} from "../../models/dosage";


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

        if (!found) {
            await _addFertilizerApi(savedFertilizer)
            setEditableFertilizer(undefined)
            return savedFertilizer
        }

        const updatedFertilizers = await _updateFertilizerApi(savedFertilizer)
        setEditableFertilizer(undefined)
        _updateFertilizerInSolution(updatedFertilizers)
        return savedFertilizer
    }

    const _addFertilizerApi = async (newFertilizer: Fertilizer): Promise<any> => {
        const response = await API.postAuthorized(ApiURL.addFertilizer, newFertilizer)
        if (!response.data.error) {
            updateFertilizersByServer()
        }
        return response.data.data
    }

    const _updateFertilizerApi = async (updatedFertilizer: Fertilizer): Promise<FertilizerDTO[]> => {
        try {
            const updatedFertilizers = await API.postAuthorized<FertilizerDTO[]>(ApiURL.updateFertilizer, {fertilizer: [updatedFertilizer]})
            updateFertilizersByServer()
            return updatedFertilizers.data.data
        } catch (err) {
            throw err
        }
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

    const _updateFertilizerInSolution = (fertilizersDTO: FertilizerDTO[]) => {
        if (solution && notEmptyArray(fertilizersDTO)) {
            const dosagesWithUpdated: Dosage[] = []
            const dosages = solution.dosages

            for (let i = 0; i < dosages.length; i++) {
                let include: FertilizerDTO | undefined;

                for (let j = 0; j < fertilizersDTO.length; j++) {
                    if (dosages[i].fertilizer.id === fertilizersDTO[j].id) {
                        include = fertilizersDTO[j]
                        break;
                    }
                }

                if (include) {
                    const updatedDosage: DosageDTO = {
                        id: dosages[i].id,
                        valueGram: dosages[i].valueGram,
                        fertilizer: include
                    }
                    dosagesWithUpdated.push(Dosage.createNew(updatedDosage))
                } else {
                    dosagesWithUpdated.push(dosages[i])
                }
            }

            const updatedSolution = new Solution({
                id: solution.id,
                name: solution.name,
                dosages: dosagesWithUpdated,
                orderNumber: solution.orderNumber,
                timestamp: solution.timestamp
            })

            setSolution(updatedSolution)
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
                onEditSolution,

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