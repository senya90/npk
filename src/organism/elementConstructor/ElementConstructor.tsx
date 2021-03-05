import React, {useCallback, useContext, useState, FC} from 'react';
import { Button } from 'atom/button/Button';
import { translate } from 'helpers/translate/translate';
import {BUTTON_TYPE} from 'atom/button/ButtonTypes';
import {ChemicalAggregate} from "../../models/chemicalAggregate";
import {AggregationConstructor} from "./aggregationConstructor/AggregationConstructor";

import style from './elementConstructor.module.scss'
import { ChemicalAtom } from 'models/chemicalAtom';
import {CalculatorContext} from "helpers/contexts/CalculatorContext";
import { ElementConstructorContext } from 'helpers/contexts/ElementConstructorContext';
import {ChemicalComplex} from "models/chemicalComplex/chemicalComplex";
import { notEmptyArray } from 'helpers/utils';
import {ApiURL} from "../../core/api/ApiURL";
import { API } from 'core/api';
import {IdGenerator} from "helpers/idGenerator/IdGenerator";
import { Gag } from 'molecule/gag/Gag';
import {useSelector} from "react-redux";
import { User } from 'models/_types/user';
import ChemicalComplexView from "./chemicalComplexView/ChemicalComplexView";
import Modal from 'organism/modal/Modal';
import {FertilizersUsingComplexes} from "../../models/_types/fertilizer";
import {DeleteComplexModal} from "./deleteComplexModal/DeleteComplexModal";
import {DeleteComplexResponse} from "../../models/_types/chemicalComplex";

interface ElementConstructorProps {
    chemicalComplexes: ChemicalComplex[]
}

const ElementConstructor: FC<ElementConstructorProps> = ({chemicalComplexes}) => {
    const {chemicals, onChemicalComplexSaved, onChemicalComplexRemoved} = useContext(CalculatorContext)
    const user: User = useSelector((state: any) => state.user.user)

    const [complexId, setComplexId] = useState<string>(IdGenerator.generate())
    const [aggregations, setAggregation] = useState<ChemicalAggregate[]>([])
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [disabledForEdit, setDisabledForEdit] = useState<boolean>(false)
    const [confirmDeleteComplex, setConfirmDeleteComplex] = useState<FertilizersUsingComplexes[] | undefined>()


    const getDefaultChemicalUnit = () => {
        return chemicals.find(chemical => chemical.name === 'N')
    }

    const addAggregation = () => {
        const defaultChemical = getDefaultChemicalUnit()

        if (defaultChemical) {
            setAggregation([
                ...aggregations,
                new ChemicalAggregate([
                    new ChemicalAtom(
                        defaultChemical
                    )
                ])
            ])
        }
    }

    const onEditComplex = (complex: ChemicalComplex) => {
        const canEdit = _canEditComplex(complex)
        setDisabledForEdit(!canEdit)

        setIsEditMode(true)
        setComplexId(complex.id)
        setAggregation(complex.chemicalAggregates)
    }

    const _canEditComplex = (complex: ChemicalComplex): boolean => {
        if (user.role === "admin") {
            return true
        }

        return complex.userId === user.userId;
    }

    const saveComplex = async () => {
        const complexName = ChemicalAggregate.allToString(aggregations)
        const chemicalComplex = new ChemicalComplex(complexName, aggregations, complexId)

        setLoading(true)
        const response = await _saveToServer(chemicalComplex)
        setLoading(false)
        const addedComplexes = response.data.data
        if (addedComplexes) {
            onChemicalComplexSaved(addedComplexes)
        }
    }

    const _updateComplexApi = async (complex: ChemicalComplex) => {
        return await API.postAuthorized(ApiURL.updateChemicalComplex, complex)
    }

    const _saveComplexApi = async (complex: ChemicalComplex) => {
        return await API.postAuthorized(ApiURL.addChemicalComplex, complex)
    }

    const _saveToServer = (chemicalComplex: ChemicalComplex): Promise<any> => {
        if (isEditMode) {
            return _updateComplexApi(chemicalComplex)
        }

        return _saveComplexApi(chemicalComplex)
    }

    const onChangeAggregationMultiplier = useCallback((updatedAggregation: ChemicalAggregate, multiplier) => {
        const updatedAggregations = aggregations.map(aggregation => {
            if (aggregation.id === updatedAggregation.id) {
                return new ChemicalAggregate(updatedAggregation.atoms, multiplier, updatedAggregation.id)
            }
            return aggregation
        })

        setAggregation(updatedAggregations)
    }, [aggregations])

    const onAddAtom = (updatedAggregation: ChemicalAggregate) => {
        const updatedAggregations = aggregations.map(aggregation => {
            if (aggregation.id === updatedAggregation.id) {
                const defaultChemical = getDefaultChemicalUnit()
                if (defaultChemical) {
                    const newAtoms = [...updatedAggregation.atoms, new ChemicalAtom(defaultChemical)]
                    return new ChemicalAggregate(newAtoms, updatedAggregation.multiplier, updatedAggregation.id)
                }

            }
            return aggregation
        })

        setAggregation(updatedAggregations)
    }

    const onChangeAtom = (aggregation: ChemicalAggregate, updatedAtom: ChemicalAtom, chemicalId: string) => {
        const updatedAggregations = aggregations.map(aggregation => {
            const updatedAtoms = aggregation.atoms
                .map(atom => {
                    if (atom.id === updatedAtom.id) {
                        let targetChemical = chemicals.find(chemical => chemical.id === chemicalId)
                        if (targetChemical) {
                            return new ChemicalAtom(targetChemical, updatedAtom.atomsCount, updatedAtom.id)
                        }
                    }

                    return atom
                })
                .filter(atom => atom)

            return new ChemicalAggregate(updatedAtoms, aggregation.multiplier, aggregation.id)
        })

        setAggregation(updatedAggregations)
    }

    const onChangeAtomCount = (aggregation: ChemicalAggregate, updatedAtom: ChemicalAtom, updatedCount: number) => {
        const updatedWithNewAtomValue = aggregations.map(aggregation => {
            const updatedAtoms =  aggregation.atoms.map(atom => {
                if (atom.id === updatedAtom.id) {
                    return new ChemicalAtom(updatedAtom.chemicalUnit, updatedCount, updatedAtom.id)
                }

                return atom
            })

            return new ChemicalAggregate(updatedAtoms, aggregation.multiplier, aggregation.id)
        })

        setAggregation(updatedWithNewAtomValue)
    }

    const onRemoveAtom = (aggregation: ChemicalAggregate, removedAtom: ChemicalAtom) => {
        const aggregationsWithoutAtom = aggregations.map(aggregation => {
            const updatedAtoms = aggregation.atoms.filter(atom => atom.id !== removedAtom.id)
            return new ChemicalAggregate(updatedAtoms, aggregation.multiplier, aggregation.id)
        })
        setAggregation(aggregationsWithoutAtom)
    }

    const onRemoveAggregation = (removedAggregation: ChemicalAggregate) => {
        const updated = aggregations.filter(aggregation => aggregation.id !== removedAggregation.id)
        setAggregation(updated)
    }

    const onRemoveComplex = async (chemicalComplex: ChemicalComplex) => {
        try {
            const response = await API.postAuthorized<DeleteComplexResponse>(ApiURL.deleteChemicalComplexes, {id: [chemicalComplex.id]})
            const deleteComplex = response.data.data
            if (deleteComplex.needToConfirm) {
                setConfirmDeleteComplex(deleteComplex.fertilizerUsingComplexes)
                return
            }

            if (!response.data.error) {
                onChemicalComplexRemoved([chemicalComplex.id])
            }
        } catch (err) {
            console.error(`ChemicalComplexView#removeComplex`, err)
        }
    }

    const closeConfirmationModal = () => {
        setConfirmDeleteComplex(undefined)
    }

    const renderAggregations = () => {
        return aggregations.map((aggregation, index) => {
            return (
                <AggregationConstructor
                    aggregation={aggregation}
                    key={index}
                    disabled={disabledForEdit}
                />
            )
        })
    }

    const aggregationsToString = () => {
        return ChemicalAggregate.allToString(aggregations)
    }

    const renderComplexes = () => {
        if (!notEmptyArray(chemicalComplexes)) {
            return null
        }

        return chemicalComplexes.map(complex => {
            return <ChemicalComplexView complex={complex} userId={user.userId} key={complex.id}/>
        })
    }

    return (
        <div>
            <ElementConstructorContext.Provider value={{
                onChangeAggregationMultiplier: onChangeAggregationMultiplier,
                onEditComplex: onEditComplex,
                onAddAtom: onAddAtom,
                onChangeAtom: onChangeAtom,
                onChangeAtomCount: onChangeAtomCount,
                onRemoveAtom: onRemoveAtom,
                onRemoveAggregation: onRemoveAggregation,
                onRemoveComplex: onRemoveComplex,
            }}>
                <div>
                    <div className={style.title}>{translate('availableCompounds')}</div>
                    <div className={style.complexesBox}>
                        {!notEmptyArray(chemicalComplexes) ?
                            <Gag>{translate('listIsEmpty')}</Gag>
                            :
                            renderComplexes()
                        }
                    </div>
                </div>
                <Button
                    className={style.addAggregationButton}
                    type={BUTTON_TYPE.PRIMARY}
                    onClick={addAggregation}
                >
                    + {translate('addCompound')}
                </Button>
                {renderAggregations()}
                <div className={style.result}>
                    {aggregationsToString()}
                </div>
                {!disabledForEdit && notEmptyArray(aggregations) &&
                    <div className={style.saveButtonWrapper}>
                        <Button
                            disabled={loading}
                            type={BUTTON_TYPE.PRIMARY}
                            onClick={saveComplex}
                        >
                            {isEditMode ? translate('save') : translate('create')}
                        </Button>
                    </div>
                }
                {confirmDeleteComplex &&
                    <Modal 
                        title={`${translate('attention')}!`}
                        onClose={closeConfirmationModal}
                    >
                        <DeleteComplexModal fertilizersUsingComplexes={confirmDeleteComplex}/>
                    </Modal>
                }

            </ElementConstructorContext.Provider>
        </div>
    );
};

export {ElementConstructor}