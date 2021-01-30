import React, {FC} from 'react';
import {ChemicalAggregate} from "../../../models/chemicalAggregate";

import style from './aggregationConstructor.module.scss'
import { Input } from 'atom/input/Input';
import {AtomConstructor} from "../atomConstructor/AtomConstructor";
import { Button } from 'atom/button/Button';
import { translate } from 'helpers/translate/translate';
import { BUTTON_TYPE } from 'atom/button/ButtonTypes';
import {ChemicalAtom} from "../../../models/chemicalAtom";

interface AggregationConstructorProps {
    aggregation: ChemicalAggregate
    onChangeAggregationMultiplier: (updatedAggregation: ChemicalAggregate, multiplier: number) => void
    onAddAtom: (aggregation: ChemicalAggregate) => void
    onChangeAtomCount: (aggregation: ChemicalAggregate, atom: ChemicalAtom, count: number) => void
}

const MIN_MULTIPLIER = 1

const AggregationConstructor: FC<AggregationConstructorProps> = ({aggregation, onChangeAggregationMultiplier, onAddAtom, onChangeAtomCount}) => {

    const changeMultiplier = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        if (isNaN(value)) {
            return
        }

        if (value === 0) {
            onChangeAggregationMultiplier(aggregation, MIN_MULTIPLIER)
            return
        }
        onChangeAggregationMultiplier(aggregation, value)
    }

    const changeAtomCount = (atom: ChemicalAtom, count: number) => {
        onChangeAtomCount(aggregation, atom, count)
    }

    const renderAtoms = () => {
        return aggregation.atoms.map((atom, index) => <AtomConstructor atom={atom} key={index} changeAtomCount={changeAtomCount}/>)
    }

    const addAtom = () => {
        onAddAtom(aggregation)
    }

    return (
        <div className={style.aggregate}>
            <Input
                className={style.multiplier}
                onChange={changeMultiplier}
                value={String(aggregation.multiplier)}
            />

            {renderAtoms()}
            <Button
                containerclass={style.addAtomButton}
                onClick={addAtom}
                type={BUTTON_TYPE.PRIMARY}
            >
                {translate('addAtom')}
            </Button>
        </div>
    );
};

export {AggregationConstructor}