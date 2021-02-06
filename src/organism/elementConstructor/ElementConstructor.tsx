import React, {useCallback, useContext, useState, useMemo, FC} from 'react';
import { Button } from 'atom/button/Button';
import { translate } from 'helpers/translate/translate';
import { BUTTON_TYPE } from 'atom/button/ButtonTypes';
import {ChemicalAggregate} from "../../models/chemicalAggregate";
import {AggregationConstructor} from "./aggregationConstructor/AggregationConstructor";

import style from './elementConstructor.module.scss'
import { ChemicalAtom } from 'models/chemicalAtom';
import {CalculatorContext} from "../../helpers/contexts/CalculatorContext";
import { ElementConstructorContext } from 'helpers/contexts/ElementConstructorContext';
import {ChemicalComplex} from "../../models/chemicalComplex/chemicalComplex";
import { notEmptyArray } from 'helpers/utils';
import {ApiURL} from "../../core/api/ApiURL";
import { API } from 'core/api';
import {IdGenerator} from "../../helpers/idGenerator/IdGenerator";
import { Gag } from 'molecule/gag/Gag';

interface ElementConstructorProps {
    complexes: ChemicalComplex[]
}

const ElementConstructor: FC<ElementConstructorProps> = ({complexes}) => {
    const complexId = useMemo(() => {
        return IdGenerator.generate()
    }, [])
    const [aggregations, setAggregation] = useState<ChemicalAggregate[]>([])
    const {chemicals} = useContext(CalculatorContext)

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

    const saveComplex = async () => {
        const complexName = ChemicalAggregate.allToString(aggregations)
        const chemicalComplex = new ChemicalComplex(complexName, aggregations, complexId)

        console.log('chemicalComplex', chemicalComplex)

        const response = await saveComplexApi(chemicalComplex)
        console.log('response', response)
    }

    const saveComplexApi = async (complex: ChemicalComplex) => {
        return await API.postAuthorized(ApiURL.addChemicalComplex, complex)
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


    const renderAggregations = () => {
        return aggregations.map((aggregation, index) => {
            return (
                <AggregationConstructor
                    aggregation={aggregation}
                    key={index}
                />
            )
        })
    }

    const aggregationsToString = () => {
        return ChemicalAggregate.allToString(aggregations)
    }

    const renderComplexes = () => {
        if (!notEmptyArray(complexes)) {
            return null
        }
        
        return complexes.map(complex => {
            return complex.name
        })
    }

    return (
        <div>
            <ElementConstructorContext.Provider value={{
                onAddAtom: onAddAtom,
                onChangeAggregationMultiplier: onChangeAggregationMultiplier,
                onChangeAtom: onChangeAtom,
                onChangeAtomCount: onChangeAtomCount,
                onRemoveAtom: onRemoveAtom,
                onRemoveAggregation: onRemoveAggregation
            }}>
                <div>
                    <div className={style.title}>{translate('availableCompounds')}</div>
                    <div className={style.complexesBox}>
                        {!notEmptyArray(complexes) ?
                            <Gag>{translate('listIsEmpty')}</Gag>
                            :
                            renderComplexes()
                        }
                    </div>
                </div>
                <Button
                    containerclass={style.addAggregationButton}
                    type={BUTTON_TYPE.PRIMARY}
                    onClick={addAggregation}
                >
                    + {translate('addCompound')}
                </Button>
                {renderAggregations()}
                <div className={style.result}>
                    {aggregationsToString()}
                </div>
                {notEmptyArray(aggregations) &&
                    <div className={style.saveButtonWrapper}>
                        <Button
                            type={BUTTON_TYPE.PRIMARY}
                            onClick={saveComplex}
                        >
                            {translate('save')}
                        </Button>
                    </div>
                }

            </ElementConstructorContext.Provider>
        </div>
    );
};

export {ElementConstructor}