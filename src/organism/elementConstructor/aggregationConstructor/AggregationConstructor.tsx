import React, {FC} from 'react';
import cn from "classnames";

import {ChemicalAggregate} from "models/chemicalAggregate";
import { Input } from 'atom/input/Input';
import {AtomConstructor} from "../atomConstructor/AtomConstructor";
import { Button } from 'atom/button/Button';
import { translate } from 'helpers/translate/translate';
import {BUTTON_SHAPE, BUTTON_TYPE} from 'atom/button/ButtonTypes';
import {ChemicalAtom} from "models/chemicalAtom";

import style from './aggregationConstructor.module.scss'


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

    const addMultiplier = () => {
        onChangeAggregationMultiplier(aggregation, aggregation.multiplier + 1)
    }

    const removeMultiplier = () => {
        let value = aggregation.multiplier - 1
        if (value <= 0) {
            value = MIN_MULTIPLIER
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

    const isShowMultiplier = () => {
        return aggregation.multiplier > 1
    }

    return (
        <div className={style.aggregate}>
            {isShowMultiplier() ?
                <div className={style.multiplierWrapper}>
                    <Input
                        className={style.multiplier}
                        onChange={changeMultiplier}
                        value={String(aggregation.multiplier)}
                    />
                    <div className={style.multiplierButtons}>
                        <Button
                            containerclass={cn(style.smallButton, style.smallButtonRemove)}
                            shape={BUTTON_SHAPE.CIRCLE}
                            onClick={removeMultiplier}
                        >
                            -
                        </Button>
                        <Button
                            containerclass={style.smallButton}
                            type={BUTTON_TYPE.PRIMARY}
                            shape={BUTTON_SHAPE.CIRCLE}
                            onClick={addMultiplier}
                        >
                            +
                        </Button>
                    </div>
                </div>

                :
                <Button
                    containerclass={style.addMultiplierButton}
                    shape={BUTTON_SHAPE.CIRCLE}
                    type={BUTTON_TYPE.PRIMARY}
                    onClick={addMultiplier}
                >
                    +
                </Button>
            }


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