import React, {useCallback, useContext, useState} from 'react';
import { Button } from 'atom/button/Button';
import { translate } from 'helpers/translate/translate';
import { BUTTON_TYPE } from 'atom/button/ButtonTypes';
import {ChemicalAggregate} from "../../models/chemicalAggregate";
import {AggregationConstructor} from "./aggregationConstructor/AggregationConstructor";

import style from './elementConstructor.module.scss'
import { ChemicalAtom } from 'models/chemicalAtom';
import {CalculatorContext} from "../../helpers/contexts/CalculatorContext";

const ElementConstructor = () => {
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


    const renderAggregations = () => {
        return aggregations.map((aggregation, index) => {
            return (
                <AggregationConstructor
                    aggregation={aggregation}
                    key={index}
                    onChangeAggregationMultiplier={onChangeAggregationMultiplier}
                    onAddAtom={onAddAtom}
                />
            )
        })
    }

    return (
        <div>
            <Button
                containerclass={style.addAggregationButton}
                type={BUTTON_TYPE.PRIMARY}
                onClick={addAggregation}
            >
                {translate('addCompound')}
            </Button>
            {renderAggregations()}
        </div>
    );
};

export {ElementConstructor}