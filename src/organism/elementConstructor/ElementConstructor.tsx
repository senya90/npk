import React, {useState} from 'react';
import { Button } from 'atom/button/Button';
import { translate } from 'helpers/translate/translate';
import { BUTTON_TYPE } from 'atom/button/ButtonTypes';
import {ChemicalAggregate} from "../../models/chemicalAggregate";
import {AggregationConstructor} from "./aggregationConstructor/AggregationConstructor";

import style from './elementConstructor.module.scss'
import { ChemicalAtom } from 'models/chemicalAtom';
import { ChemicalUnit } from 'models/chemicalUnit';

const ElementConstructor = () => {
    const [aggregations, setAggregation] = useState<ChemicalAggregate[]>([])

    const addAggregation = () => {
        setAggregation([
            ...aggregations,
            new ChemicalAggregate([
                new ChemicalAtom(
                    new ChemicalUnit()
                )
            ])
        ])
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