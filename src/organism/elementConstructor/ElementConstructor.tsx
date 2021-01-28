import React, {useContext, useState} from 'react';
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

    const renderAggregations = () => {
        return aggregations.map((aggregation, index) => <AggregationConstructor aggregation={aggregation} key={index}/>)
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